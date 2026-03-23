import mongoose from "mongoose";

const apiSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    baseUrl: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      enum: [
        "auth",
        "payments",
        "ai",
        "social",
        "utility",
        "finance",
        "health",
        "education",
        "ecommerce",
        "communication",
        "analytics",
        "storage",
        "media",
        "maps",
        "travel",
        "sports",
        "news",
        "weather",
        "blockchain",
        "iot",
        "gaming",
        "productivity",
        "security",
        "devtools",
        "other"
      ],
      default: "other",
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const API = mongoose.model("API", apiSchema);

export default API;