const express = require("express"); // Import Express
const router = express.Router(); // Initialize the router
const Banner = require("../models/banners"); // Import the Banner model
const Product = require("../models/products");

// Route to get all banners
router.get("/banners", async (req, res) => {
  try {
    const banners = await Banner.find(); // Fetch all banners from the collection
    console.log(banners);
    res.json(banners); // Send data as JSON
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch banners" });
  }
});

// Route to get all products with pagination
router.get("/products", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1; // Default to page 1
    const pageSize = parseInt(req.query.pageSize) || 10; // Default page size to 10

    const skip = (page - 1) * pageSize;

    // Fetch products with pagination
    const products = await Product.find()
      .skip(skip) // Skip the products for the previous pages
      .limit(pageSize) // Limit to the number of products for the current page
      .exec();

    // Get the total number of products to calculate total pages
    const totalProducts = await Product.countDocuments();

    // Send paginated response
    res.json({
      products,
      currentPage: page,
      pageSize: pageSize,
      totalPages: Math.ceil(totalProducts / pageSize),
      totalProducts: totalProducts,
    });
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Route to get all products with id
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    // Check if product was found
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Send the found product as a JSON response
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});


// Route to get bestseller products
router.get("/products/bestsellers", async (req, res) => {
    try {
          const product = await Product.find({ bestseller: true });
  
      if (product.length === 0) {
        console.log('No bestseller products found');
        return res.status(404).json({ error: "No bestseller products found" });
      }

      res.json(products);
    } catch (err) {
      console.error('Error fetching bestsellers:', err);
      res.status(500).json({ error: "Failed to fetch products" });
    }
});

// Route to get the last 5 products
router.get("/products/latest", async (req, res) => {
    try {
      // Fetch the last 5 products
      const products = await Product.find().sort({ _id: -1 }).limit(5);
      res.json(products);
    } catch (err) {
      console.error('Error fetching latest products:', err);
      res.status(500).json({ error: "Failed to fetch products" });
    }
  });
  
  
  
  

// Route to get all products
router.post("/products", async (req, res) => {
  const newItem = new Product({
    id: 26,
    title: "Amuseables Acorn",
    category: "Amuseables",
    des: "A round woodland rascal, Amuseables Acorn has nutty brown fur, with a fuzzly beret and fine suedey stalk! This affable acorn can't wait for autumn, and scoots round the forest on chocolate cord feet!",
    priceList: {
      small: 30,
      medium: 38,
      large: 45,
    },
    pics: {
      default: {
        front:
          "https://raw.githubusercontent.com/boer-coding/boer-coding/main/data/jellycat/images/products/aac1.jpg",
        side: "https://raw.githubusercontent.com/boer-coding/boer-coding/main/data/jellycat/images/products/aac2.jpg",
        back: "https://raw.githubusercontent.com/boer-coding/boer-coding/main/data/jellycat/images/products/aac3.jpg",
      },
    },
  });

  try {
    const product = await newItem.save(); // Fetch all products from the collection
    res.json(product); // Send data as JSON
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

// Route to get all products
router.patch("/products/:id", async (req, res) => {
  try {
    const updatePosts = await Product.updateOne(
      { _id: req.params.id },
      { $set: { title: req.body.title } }
    ); // Fetch all products from the collection
    res.json(updatePosts); // Send data as JSON
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

module.exports = router;
