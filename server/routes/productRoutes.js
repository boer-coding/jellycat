const express = require("express"); // Import Express
const router = express.Router(); // Initialize the router
const Banner = require("../models/banners"); // Import the Banner model
const Product = require("../models/products");

// Route to get all banners
router.get("/banners", async (req, res) => {
  try {
    const banners = await Banner.find(); // Fetch all banners from the collection
    res.json(banners); // Send data as JSON
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch banners" });
  }
});

// Route to get all products with pagination and optional category
router.get("/products", async (req, res) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = Math.max(1, Math.min(parseInt(req.query.pageSize) || 6, 100)); // Limit pageSize to a max of 100
    const skip = (page - 1) * pageSize;

    // Create a query object based on the category if provided
    const query = req.query.category ? { category: req.query.category } : {};

    // Fetch products based on the query, applying pagination
    const products = await Product.find(query)
      .skip(skip)
      .limit(pageSize)
      .exec();
      console.log("req",req.query);

    // Get the total number of products that match the query
    const totalProducts = await Product.countDocuments(query);

    // Send the response with products and pagination info
    res.json({
      products,
      currentPage: page,
      pageSize: pageSize,
      totalPages: Math.ceil(totalProducts / pageSize),
      totalProducts: totalProducts,
    });
  } catch (err) {
    console.error(err);
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
    res.status(500).json({ error: "Failed to fetch products by id" });
  }
});


// Route to get bestseller products
router.get("/bestsellers", async (req, res) => {
  try {
    // Query to find bestselling products
    const products = await Product.find({ bestseller: true }).exec();

    // Check if any products were found
    if (products.length === 0) {
      return res.status(404).json({ error: "No bestselling products found" });
    }

    // Send the found products as a JSON response
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bestselling products" });
  }
});


// Route to get the last 5 products
router.get("/newin", async (req, res) => {
  try {
    // Query to find bestselling products
    const products = await Product.find({ newin: true }).exec();

    // Check if any products were found
    if (products.length === 0) {
      return res.status(404).json({ error: "No bestselling products found" });
    }

    // Send the found products as a JSON response
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch bestselling products" });
  }
});
  
  
  
  

// // Route to get all products
// router.post("/products", async (req, res) => {
//   const newItem = new Product({
//     id: 26,
//     title: "Amuseables Acorn",
//     category: "Amuseables",
//     des: "A round woodland rascal, Amuseables Acorn has nutty brown fur, with a fuzzly beret and fine suedey stalk! This affable acorn can't wait for autumn, and scoots round the forest on chocolate cord feet!",
//     priceList: {
//       small: 30,
//       medium: 38,
//       large: 45,
//     },
//     pics: {
//       default: {
//         front:
//           "https://raw.githubusercontent.com/boer-coding/boer-coding/main/data/jellycat/images/products/aac1.jpg",
//         side: "https://raw.githubusercontent.com/boer-coding/boer-coding/main/data/jellycat/images/products/aac2.jpg",
//         back: "https://raw.githubusercontent.com/boer-coding/boer-coding/main/data/jellycat/images/products/aac3.jpg",
//       },
//     },
//   });

//   try {
//     const product = await newItem.save(); // Fetch all products from the collection
//     res.json(product); // Send data as JSON
//   } catch (err) {
//     res.status(500).json({ error: "Failed to fetch products" });
//   }
// });

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
