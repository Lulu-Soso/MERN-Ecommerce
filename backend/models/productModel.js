import mongoose from "mongoose";

const reviewSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    rating: { type: Number, required: true },
    comment: { type: String, required: true },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);

const productSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: true,
    },
    mainImage: {
      type: String,
      required: true,
    },
    thumbnailImages: {
      type: [String],
      validate: [arrayLimit, "{PATH} exceeds the limit of 4"],
    },
    brand: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    reviews: [reviewSchema],
    rating: {
      type: Number,
      required: true,
      default: 0,
    },
    numReviews: {
      type: Number,
      required: true,
      default: 0,
    },
    price: {
      type: Number,
      required: true,
      default: 0,
    },
    countInStock: {
      type: Number,
      required: true,
      default: 0,
    },
    size: {
      type: String,
      required: true,
    },
    packageSize: {
      L: { type: Number, required: true },
      W: { type: Number, required: true },
      H: { type: Number, required: true },
    },
    weight: {
      type: Number,
      required: true,
      default: 0,
    }
  },
  {
    timestamps: true,
  }
);

function arrayLimit(val) {
  return val.length <= 4;
}

const Product = mongoose.model("Product", productSchema);

export default Product;
