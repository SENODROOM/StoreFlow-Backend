const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const Order = require('./models/Order');
const User = require('./models/User');
const authMiddleware = require('./middleware/auth');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// MongoDB Connection
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/orderSystemDB';

mongoose.connect(MONGODB_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Authentication Routes

// Register new shopkeeper
app.post('/api/auth/register', async (req, res) => {
  try {
    const { shopName, ownerName, email, password, phone, address } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: 'Email already registered. Please login.'
      });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      shopName,
      ownerName,
      email,
      password: hashedPassword,
      phone,
      address
    });

    await newUser.save();

    // Generate JWT token
    const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.status(201).json({
      success: true,
      message: 'Account created successfully',
      token,
      user: {
        id: newUser._id,
        shopName: newUser.shopName,
        ownerName: newUser.ownerName,
        email: newUser.email,
        phone: newUser.phone,
        address: newUser.address
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error creating account',
      error: error.message
    });
  }
});

// Login shopkeeper
app.post('/api/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password'
      });
    }

    // Generate JWT token
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '30d'
    });

    res.status(200).json({
      success: true,
      message: 'Login successful',
      token,
      user: {
        id: user._id,
        shopName: user.shopName,
        ownerName: user.ownerName,
        email: user.email,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error logging in',
      error: error.message
    });
  }
});

// Get current user info (verify token)
app.get('/api/auth/me', authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.userId).select('-password');
    
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found'
      });
    }

    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        shopName: user.shopName,
        ownerName: user.ownerName,
        email: user.email,
        phone: user.phone,
        address: user.address
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching user info',
      error: error.message
    });
  }
});

// Order Routes (Protected)

// Create new order (only for authenticated user)
app.post('/api/orders', authMiddleware, async (req, res) => {
  try {
    const { customerName, customerPhone, customerAddress, products } = req.body;

    // Support both single product (old format) and multiple products (new format)
    let productArray;
    if (products && Array.isArray(products)) {
      productArray = products;
    } else if (req.body.product) {
      // Backward compatibility with old single product format
      productArray = [req.body.product];
    } else {
      return res.status(400).json({
        success: false,
        message: 'Products are required'
      });
    }

    const newOrder = new Order({
      userId: req.userId,
      customerName,
      customerPhone,
      customerAddress,
      products: productArray,
      orderTime: new Date()
    });

    const savedOrder = await newOrder.save();
    res.status(201).json({
      success: true,
      message: 'Order created successfully',
      data: savedOrder
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'Error creating order',
      error: error.message
    });
  }
});

// Get all orders for the authenticated user only
app.get('/api/orders', authMiddleware, async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({ orderTime: -1 });
    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error fetching orders',
      error: error.message
    });
  }
});

// Search orders for the authenticated user only
app.get('/api/orders/search', authMiddleware, async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({
        success: false,
        message: 'Search query is required'
      });
    }

    const orders = await Order.find({
      userId: req.userId,
      $or: [
        { customerName: { $regex: query, $options: 'i' } },
        { customerPhone: { $regex: query, $options: 'i' } },
        { products: { $regex: query, $options: 'i' } },
        { customerAddress: { $regex: query, $options: 'i' } }
      ]
    }).sort({ orderTime: -1 });

    res.status(200).json({
      success: true,
      count: orders.length,
      data: orders
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error searching orders',
      error: error.message
    });
  }
});

// Update order (only if it belongs to the authenticated user)
app.put('/api/orders/:id', authMiddleware, async (req, res) => {
  try {
    const { customerName, customerPhone, customerAddress, products } = req.body;
    
    const order = await Order.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found or you do not have permission to update it'
      });
    }

    // Update order fields
    if (customerName) order.customerName = customerName;
    if (customerPhone) order.customerPhone = customerPhone;
    if (customerAddress) order.customerAddress = customerAddress;
    if (products && Array.isArray(products) && products.length > 0) {
      order.products = products;
    }

    const updatedOrder = await order.save();

    res.status(200).json({
      success: true,
      message: 'Order updated successfully',
      data: updatedOrder
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error updating order',
      error: error.message
    });
  }
});

// Delete order (only if it belongs to the authenticated user)
app.delete('/api/orders/:id', authMiddleware, async (req, res) => {
  try {
    const order = await Order.findOne({ _id: req.params.id, userId: req.userId });
    
    if (!order) {
      return res.status(404).json({
        success: false,
        message: 'Order not found or you do not have permission to delete it'
      });
    }

    await Order.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Order deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error deleting order',
      error: error.message
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
