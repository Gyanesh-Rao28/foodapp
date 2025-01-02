import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Menu item name is required'],
        trim: true
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Appetizers', 'Main Course', 'Desserts', 'Beverages','Breads']
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
        min: 0
    },
    availability: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

const Menu = mongoose.model('Menu', menuSchema);
export default Menu;