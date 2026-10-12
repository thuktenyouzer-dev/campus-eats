const Restaurant = require('../models/Restaurant');
const MenuItem = require('../models/MenuItem');
const Feedback = require('../models/Feedback');

exports.dashboard = async (req, res) => {
  const restaurant = await Restaurant.getRestaurantByOwnerId(req.session.user.id);
  if (!restaurant) {
    return res.render('admin-dashboard', { title: 'My Dashboard', restaurant: null, items: [], feedback: [] });
  }
  const items = await MenuItem.getMenuByRestaurant(restaurant.id);
  const feedback = await Feedback.getFeedbackForRestaurant(restaurant.id);
  res.render('admin-dashboard', { title: 'My Dashboard', restaurant, items, feedback });
};

exports.addMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.getRestaurantByOwnerId(req.session.user.id);

    if (!restaurant) {
      return res.status(404).send('No restaurant is linked to this account.');
    }

    const { name, price } = req.body;
    const numericPrice = Number(price);

    if (!name || !name.trim() || !Number.isFinite(numericPrice) || numericPrice < 1) {
      return res.redirect('/admin/dashboard');
    }

    await MenuItem.createMenuItem({
      restaurantId: restaurant.id,
      name: name.trim(),
      price: numericPrice,
    });

    return res.redirect('/admin/dashboard');
  } catch (error) {
    console.error('Failed to add menu item:', error.message);
    return res.status(500).send('Unable to add menu item right now.');
  }
};

