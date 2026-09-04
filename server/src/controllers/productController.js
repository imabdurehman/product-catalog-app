const Product = require("../models/Product");

const getAllProducts = async (req, res) => {
  try {
    const { search, category, sort, page = 1, limit = 6 } = req.query;

    const filter = {};

    if (search) {
      filter.name = { $regex: search, $options: "i" };
    }

    if (category && category !== "All") {
      filter.category = category;
    }

    let query = Product.find(filter);

    if (sort === "price-low-to-high") {
      query = query.sort({ price: 1 });
    } else if (sort === "price-high-to-low") {
      query = query.sort({ price: -1 });
    } else if (sort === "rating") {
      query = query.sort({ rating: -1 });
    } else if (sort === "name") {
      query = query.collation({ locale: "en", strength: 2 }).sort({ name: 1 });
    }

    const skip = (page - 1) * limit;

    query = query.skip(skip).limit(Number(limit));

    const products = await query;

    const totalProducts = await Product.countDocuments(filter);

    const hasMore = skip + products.length < totalProducts;

    res.status(200).json({ products, hasMore });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch products",
      error: error.message,
    });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch product",
      error: error.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);

    res.status(201).json(newProduct);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (error) => error.message,
      );

      return res.status(400).json({
        messages,
      });
    }

    res.status(500).json({
      message: "Failed to create product",
      error: error.message,
    });
  }
};

const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json(product);
  } catch (error) {
    if (error.name === "ValidationError") {
      const messages = Object.values(error.errors).map(
        (error) => error.message,
      );

      return res.status(400).json({
        messages,
      });
    }

    res.status(500).json({
      message: "Failed to update product",
      error: error.message,
    });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        message: "Product not found",
      });
    }

    res.status(200).json({
      message: "Product deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to delete product",
      error: error.message,
    });
  }
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
};
