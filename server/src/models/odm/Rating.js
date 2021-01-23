const mongoose = require("mongoose");

module.exports =
  mongoose.models.Rating ||
  mongoose.model(
    "Rating",
    new mongoose.Schema(
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
        },
        stars: {
          type: Number,
          required: true,
        },
      },
      {
        timestamps: {
          createdAt: "created_at",
          updatedAt: "updated_at",
        },
      }
    )
  );
