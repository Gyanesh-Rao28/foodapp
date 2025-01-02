import Order from '../models/order.model.js';
import Menu from '../models/menu.model.js';

// Place a new order
const createOrder = async (req, res) => {
    try {
        const { items } = req.body; // Array of { menuItemId, quantity }

        if (!items || !items.length) {
            return res.status(400).json({
                success: false,
                message: 'Order must contain at least one item'
            });
        }

        // Get menu items
        const menuItemIds = items.map(item => item.menuItemId);
        const menuItems = await Menu.find({ _id: { $in: menuItemIds } });

        // Validate all items exist and are available
        const menuItemsMap = new Map(menuItems.map(item => [item._id.toString(), item]));

        let orderItems = [];

        for (const item of items) {
            const menuItem = menuItemsMap.get(item.menuItemId.toString());

            if (!menuItem) {
                return res.status(404).json({
                    success: false,
                    message: `Menu item with id ${item.menuItemId} not found`
                });
            }

            if (!menuItem.availability) {
                return res.status(400).json({
                    success: false,
                    message: `${menuItem.name} is currently unavailable`
                });
            }

            orderItems.push({
                menuItem: item.menuItemId,
                quantity: item.quantity,
                price: menuItem.price // Store current price of item
            });
        }

        const order = new Order({
            userId: req.user._id, // From auth middleware
            items: orderItems,
            status: 'Pending'
        });

        // The totalAmount will be calculated automatically by the pre-save hook
        await order.save();

        res.status(201).json({
            success: true,
            message: 'Order placed successfully',
            data: order
        });

    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error creating order',
            error: error.message
        });
    }
};

// Get all orders for logged in user
const getUserOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user._id })
            .populate({
                path: 'items.menuItem',
                select: 'name price category'
            })
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            message: 'Orders fetched successfully',
            data: orders
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Error fetching orders',
            error: error.message
        });
    }
};

export {
    createOrder,
    getUserOrders
};