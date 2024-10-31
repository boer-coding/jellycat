const express = require("express"); // Import Express
const router = express.Router(); // Initialize the router
const Banner = require("../models/banners"); // Import the Banner model

// Route to get all banners
router.get("/banners", async (req, res) => {
  try {
    const banners = await Banner.find(); // Fetch all banners from the collection
    res.json(banners); // Send data as JSON
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch banners" });
  }
});


module.exports = router;