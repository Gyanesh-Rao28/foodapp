import connectDB from '../db.js';
import Menu from '../models/menu.model.js';

// import menuData from '../utils/menu.js';

// const seedMenu = async (req, res) => {
//     try {
//         // Clear existing menu items
//         // await Menu.deleteMany({});

//         // Insert new menu items
//         const items = await Menu.insertMany(menuData);

//         res.status(200).json({
//             success: false,
//             message: 'Error fetching menu items',
//             error: items
//         });
//     } catch (error) {
//         res.status(500).json({
//             success: false,
//             message: 'Error fetching menu items',
//             error: error.message
//         });
//     }
// };

// Fetch all menu items
const getAllMenuItems = async (req, res) => {
    try {
        await connectDB();
        const menuItems = await Menu.find({});

        res.status(200).json({
            success: true,
            message: 'Menu items fetched successfully',
            data: menuItems
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching menu items',
            error: error.message
        });
    }
};

// Add new menu item
const createMenuItem = async (req, res) => {
    try {
        await connectDB();

        const { name, category, price, availability } = req.body;

        const menuItem = new Menu({
            name,
            category,
            price,
            availability: availability ?? true
        });

        await menuItem.save();

        res.status(201).json({
            success: true,
            message: 'Menu item created successfully',
            data: menuItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating menu item',
            error: error.message
        });
    }
};

// Update menu item
const updateMenuItem = async (req, res) => {
    try {
        await connectDB();

        const { id } = req.params;
        const updates = req.body;

        const menuItem = await Menu.findById(id);

        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }

        // Update only provided fields
        Object.keys(updates).forEach(key => {
            if (updates[key] !== undefined) {
                menuItem[key] = updates[key];
            }
        });

        await menuItem.save();

        res.status(200).json({
            success: true,
            message: 'Menu item updated successfully',
            data: menuItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error updating menu item',
            error: error.message
        });
    }
};

// Delete menu item
const deleteMenuItem = async (req, res) => {
    try {
        await connectDB();
        const { id } = req.params;

        const menuItem = await Menu.findByIdAndDelete(id);

        if (!menuItem) {
            return res.status(404).json({
                success: false,
                message: 'Menu item not found'
            });
        }

        // const menuItem = await Menu.deleteMany({});

        res.status(200).json({
            success: true,
            message: 'Menu item deleted successfully',
            data: menuItem
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error deleting menu item',
            error: error.message
        });
    }
};

export {
    getAllMenuItems,
    createMenuItem,
    updateMenuItem,
    deleteMenuItem,
    // seedMenu
};