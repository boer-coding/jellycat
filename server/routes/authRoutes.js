const express = require("express"); // Import Express
const router = express.Router(); // Initialize the router
const User = require("../models/user");
const passport = require("passport");

const { isAuthenticated } = require("../middleware/authMiddleware");

// Registration Route
router.post("/register", async (req, res) => {
  try {
    const { email, password, username } = req.body;
    const user = new User({ email, username }); // Pass username into the User model
    const registeredUser = await User.register(user, password);
    console.log(registeredUser);

    req.logIn(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Login failed. Please try again." });
      }

      const userCart = user.cart || [];

      const mergedCart = [...userCart];

      sessionCart.forEach((sessionItem) => {
        const userItem = mergedCart.find(
          (item) => item.id === sessionItem.id && item.size === sessionItem.size
        );
        if (userItem) {
          userItem.count += sessionItem.count;
          userItem.cost += sessionItem.count;
        } else {
          mergedCart.push(sessionItem);
        }
      });

      user.cart = mergedCart;

      user.save();

      // Update session cart
      req.session.cart = mergedCart;

      // Send the user data (email, username) to the frontend directly in the response
      return res.status(200).json({
        message: "Login successful!",
        user: {
          email: user.email, // The user's email
          username: user.username || "Jelly fan", // The user's username or default name
        }
      });
    });
  } catch (error) {
    console.error("Registration error:", error);
    if (error.name === "UserExistsError") {
      return res
        .status(409)
        .json({ message: "User already exists. Please try logging in." }); // 409 Conflict for duplicate user
    }
    res.status(500).json({ message: "Registration failed. Please try again." }); // 500 for general server error
  }
});

// Login Route
router.post("/login", (req, res, next) => {
  // Validate input

  if (!req.body.email || !req.body.password) {
    return res
      .status(400)
      .json({ message: "Email and password are required." });
  }
  const sessionCart = req.session.cart || [];

  // Authenticate user using Passport's 'local' strategy
  passport.authenticate("local", async (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: "Internal server error" });
    }
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // Log the user in
    req.logIn(user, (err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Login failed. Please try again." });
      }

      const userCart = user.cart || [];

      const mergedCart = [...userCart];

      sessionCart.forEach((sessionItem) => {
        const userItem = mergedCart.find(
          (item) => item.id === sessionItem.id && item.size === sessionItem.size
        );
        if (userItem) {
          userItem.count += sessionItem.count;
          userItem.cost += sessionItem.count;
        } else {
          mergedCart.push(sessionItem);
        }
      });

      user.cart = mergedCart;

      user.save();

      // Update session cart
      req.session.cart = mergedCart;

      // Send the user data (email, username) to the frontend directly in the response
      return res.status(200).json({
        message: "Login successful!",
        user: {
          email: user.email, // The user's email
          username: user.username || "Jelly fan", // The user's username or default name
        }
      });
    });
  })(req, res, next); // Immediately invoke the authenticate function
});

router.get("/auth/status", (req, res) => {
  // console.log("Session:", req.session);
  // console.log("Cookies:", req.headers.cookie);
  if (req.isAuthenticated()) {
    return res.status(200).json({ isLoggedIn: true, userId: req.user._id }); // User is logged in
  } else {
    return res.status(200).json({ isLoggedIn: false }); // User is not logged in
  }
});

router.get("/dashboard", isAuthenticated, (req, res) => {
  res
    .status(200)
    .json({ message: `Welcome to your dashboard, ${req.user.username}!` });
});
// Logout route
router.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res
        .status(500)
        .json({ message: "Logout failed. Please try again." });
    }

    // Destroy the session to remove it completely
    req.session.destroy((err) => {
      if (err) {
        return res.status(500).json({ message: "Session destruction failed." });
      }

      // Optionally clear the cookie
      res.clearCookie("jelly"); // Assuming 'connect.sid' is the name of the session cookie
      return res.status(200).json({ message: "Logout successful!" });
    });
  });
});

module.exports = router;
