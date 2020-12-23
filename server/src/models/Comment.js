const mongoose = require("mongoose");

module.exports =
  mongoose.models.Comment ||
  mongoose.model(
    "Comment",
    new mongoose.Schema(
      {
        text: {
          type: String,
          required: true,
        },
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        images: [],
      },
      {
        timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
      }
    )
  );
