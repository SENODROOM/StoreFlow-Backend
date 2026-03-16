const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  shopName: {
    type: String,
    trim: true
  },
  ownerName: {
    type: String,
    trim: true
  },
  name: {
    type: String,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  address: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    required: true,
    enum: ['shopkeeper', 'customer'],
    default: 'shopkeeper'
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Custom validation for role-specific fields
userSchema.pre('save', function(next) {
  if (this.role === 'shopkeeper') {
    if (!this.shopName || !this.ownerName) {
      return next(new Error('Shop name and owner name are required for shopkeeper registration'));
    }
  }
  
  if (this.role === 'customer') {
    if (!this.name) {
      return next(new Error('Name is required for customer registration'));
    }
  }
  
  next();
});

module.exports = mongoose.model('User', userSchema);
