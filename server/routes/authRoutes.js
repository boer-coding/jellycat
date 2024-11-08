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

    // Register the user using the User model's 'register' method
    const registeredUser = await User.register(user, password);
    // console.log("Registered User:", registeredUser);

    // Respond with user data and a success message
    return res.status(200).json({
      message: "Register successful!",
      user: {
        email: registeredUser.email,
        username: registeredUser.username,
      },
    });
  } catch (error) {
    console.error("Registration error:", error);

    // Check for duplicate user error and respond with 409 Conflict
    if (error.name === "UserExistsError") {
      return res.status(409).json({
        message: "User already exists. Please try logging in.",
      });
    }

    // Respond with 500 Internal Server Error for general errors
    res.status(500).json({
      message: "Registration failed. Please try again.",
    });
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
      console.log(req.session)

      // Send the user data (email, username) to the frontend directly in the response
      return res.status(200).json({
        message: "Login successful!",
        user: {
          email: user.email, // The user's email
          username: user.username || "Jelly fan", // The user's username or default name
          userId: user._id,
        },
      });
    });
  })(req, res, next); // Immediately invoke the authenticate function
});

router.get("/auth/status", (req, res) => {
  if (req.isAuthenticated()) {
    return res.status(200).json({
      isLoggedIn: true,
      userId: req.user._id,
      email: req.user.email, // The user's email
      username: req.user.username,
    }); // User is logged in
  } else {
    return res.status(200).json({ isLoggedIn: false }); // User is not logged in
  }
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

router.put("/updateUser", async (req, res) => {
  const { email, username } = req.body;
  try {
    // Update the user's username based on email
    const updatedUser = await User.findOneAndUpdate(
      { email },
      { username },
      { new: true } // Returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({ message: "Username updated successfully" });
  } catch (error) {
    console.error("Error updating username:", error);
    return res.status(500).json({ message: "Error updating username" });
  }
});

router.delete("/deleteUser", async (req, res) => {
  const { id } = req.body;
  try {
    await User.findByIdAndDelete(id); // Delete the user by their ID
    req.logout((err) => {
      if (err) {
        return res
          .status(500)
          .json({ message: "Logout failed. Please try again." });
      }

      // Destroy session and clear cookie
      req.session.destroy((err) => {
        if (err) {
          return res
            .status(500)
            .json({ message: "Session destruction failed." });
        }

        // Clear session cookie
        res.clearCookie("connect.sid"); // Adjust the cookie name if different
        return res
          .status(200)
          .json({ message: "Account deleted and logged out successfully." });
      });
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting account" });
  }
});

module.exports = router;
