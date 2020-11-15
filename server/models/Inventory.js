const mongoose = require("mongoose");

module.exports =
    mongoose.models.Inventory ||
    mongoose.model(
        "Inventory",
        new mongoose.Schema(
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    required: true,
                },
                count: {
                    type: Number,
                    default: 0,
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
