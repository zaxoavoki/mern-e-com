const mongoose = require("mongoose");

module.exports =
    mongoose.models.Transcation ||
    mongoose.model(
        "Transaction",
        new mongoose.Schema(
            {
                user: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "User",
                },
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                },
                count: {
                    type: Number,
                    required: true,
                },
                status: {
                    type: String,
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
