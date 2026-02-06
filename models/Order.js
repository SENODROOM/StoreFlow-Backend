const mongoose = require('mongoose');

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
    type: [String],
    required: true,
    validate: {
      validator: function(v) {
        return v && v.length > 0;
      },
      message: 'At least one product is required'
    }
  },
  // Keep 'product' field for backward compatibility
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
orderSchema.pre('save', function(next) {
  // If old 'product' field is used, convert to products array
  if (this.product && (!this.products || this.products.length === 0)) {
    this.products = [this.product];
  }
  // If products array exists, set the first product as 'product' for compatibility
  if (this.products && this.products.length > 0 && !this.product) {
    this.product = this.products[0];
  }
  next();
});

module.exports = mongoose.model('Order', orderSchema);
