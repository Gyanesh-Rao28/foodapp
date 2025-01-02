// src/models/order.model.js
import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    items: [{
        menuItem: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Menu',
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true
        }
    }],
    totalAmount: {
        type: Number,
        default: 0  // Set a default value instead of required
    },
    status: {
        type: String,
        enum: ['Pending', 'Preparing','Completed'],
        default: 'Pending'
    }
}, {
    timestamps: true
});

// Calculate total amount before saving
orderSchema.pre('save', function (next) {
    this.totalAmount = this.items.reduce((total, item) => {
        return total + (item.price * item.quantity);
    }, 0);
    next();
});

const Order = mongoose.model('Order', orderSchema);
export default Order;