const mongoose = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
    minlength: [5, "Product name must be at least 5 characters"],
  },

  brand: {
    type: String,
    required: [true, "Brand is required"],
    trim: true,
  },

  category: {
    type: String,
    required: [true, "Category is required"],
    trim: true,
  },

  price: {
    type: Number,
    required: [true, "Price is required"],
    min: [0, "Price cannot be negative"],
  },

  rating: {
    type: Number,
    required: [true, "Rating is required"],
    min: [0, "Rating cannot be less than 0"],
    max: [5, "Rating cannot be greater than 5"],
    validate: {
      validator: (value) => Number.isInteger(value * 10),
      message: "Rating can have at most 1 decimal place",
    },
  },

  description: {
    type: String,
    required: [true, "Description is required"],
    trim: true,
    minlength: [10, "Description must be at least 10 characters"],
  },

  image: {
    type: String,
    required: [true, "Image is required"],
    trim: true,
  },
});

module.exports = mongoose.model("Product", productSchema);
