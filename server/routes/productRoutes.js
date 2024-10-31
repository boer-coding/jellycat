const express = require("express"); // Import Express
const router = express.Router(); // Initialize the router
const Product = require("../models/products");

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


// Route to search for products by title and return selected fields
router.get("/search", async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const pageSize = Math.max(1, Math.min(parseInt(req.query.pageSize) || 6, 100));
    const skip = (page - 1) * pageSize;

    if (!searchTerm) {
      return res.status(400).json({ error: "Search term is required" });
    }

    // Perform a case-insensitive search on the title field
    const query = {
      title: { $regex: searchTerm, $options: "i" }
    };

    // Fetch products based on the search query, only returning the necessary fields
    const products = await Product.find(query, {
      title: 1,
      _id: 1,
      "priceList.small": 1,  // Adjust based on your actual price structure
      "pics.default.front": 1      // Adjust based on your actual image structure
    })
      .skip(skip)
      .limit(pageSize)
      .exec();

    // Get the total number of products that match the search query
    const totalProducts = await Product.countDocuments(query);

    // Map the products to include only necessary fields for frontend
    const result = products.map(product => ({
      id: product._id,
      title: product.title,
      price: product.priceList.small || 0,  // Default price if undefined
      img: product.pics?.default?.front || ""       // Default image if undefined
    }));

    // Send the response with products and pagination info
    res.json({
      products: result,
      currentPage: page,
      pageSize: pageSize,
      totalPages: Math.ceil(totalProducts / pageSize),
      totalProducts: totalProducts,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to search products" });
  }
});


module.exports = router;
