const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  quantity: {
    type: Number,
    required: true,
    min: 1,
    default: 1
  },
  price: {
    type: Number,
    required: true,
    min: 0,
    default: 0
  }
}, { _id: false });

const orderSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  customerName: {
    type: String,
    required: true,
    trim: true
  },
  customerPhone: {
    type: String,
    required: true,
    trim: true
  },
  customerAddress: {
    type: String,
    required: true,
    trim: true
  },
  products: {
    type: [productSchema],
    required: true,
    validate: {
      validator: function (v) {
        return v && v.length > 0;
      },
      message: 'At least one product is required'
    }
  },
  // Keep 'product' field for backward compatibility with old orders
  product: {
    type: String,
    trim: true
  },
  orderTime: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

// Middleware to handle backward compatibility
orderSchema.pre('save', function (next) {
  // If old 'product' field is used, convert to products array
  if (this.product && (!this.products || this.products.length === 0)) {
    this.products = [{ name: this.product, quantity: 1, price: 0 }];
  }
  // If products array exists with objects, set the first product name as 'product' for compatibility
  if (this.products && this.products.length > 0 && !this.product) {
    if (typeof this.products[0] === 'object' && this.products[0].name) {
      this.product = this.products[0].name;
    } else if (typeof this.products[0] === 'string') {
      this.product = this.products[0];
    }
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);