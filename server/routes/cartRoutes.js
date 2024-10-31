const express = require("express"); // Import Express
const router = express.Router(); // Initialize the router
const User = require("../models/user");

// Route to retrieve the cart from the session
router.get("/fetchSessionCart", (req, res) => {
  // Check if the session has a cart, if not send an empty array
  const cart = req.session.cart || [];

  res.status(200).json({
    message: "Cart retrieved successfully",
    cart: cart,
  });
});

router.post("/fetchUserCart", async (req, res) => {
  try {
    const { userId } = req.body; // Get userId from request body
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const cart = user.cart || []; // Get user's cart or empty array if none exists
    res.status(200).json({
      message: "Cart retrieved successfully",
      cart: cart,
    });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Failed to fetch user cart" });
  }
});

// Route to update items in the cart and store them in the session
router.post("/updateSessionCart", (req, res) => {
  const items = Array.isArray(req.body) ? req.body : [req.body];

  // Initialize the cart in session if it doesn't exist
  req.session.cart = items;

  // Save the session (automatically handled when session data is updated)
  res.status(200).json({
    message: "Cart synced with session",
    cart: req.session.cart,
  });
});

router.post("/updateUserCart", async (req, res) => {
  try {
    const { userId, cartList } = req.body; // Destructure userId and cartList from the request body
    const user = await User.findById(userId); // Use userId to find the user
    user.cart = cartList; // Replace the user's cart with the new cart data
    await user.save(); // Save the updated user cart
    res.status(200).json({ cart: user.cart });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to sync cart with user collection." });
  }
});

router.post("/clearSessionCart", (req, res) => {
  req.session.cart = [];
  req.session.save((err) => {
    if (err) {
      return res.status(500).json({ message: "Failed to clear session cart." });
    }
    res.status(200).json({ message: "Session cart cleared." });
  });
});

module.exports = router;
