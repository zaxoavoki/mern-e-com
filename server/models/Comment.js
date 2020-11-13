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
                user_id: {
                    type: mongoose.SchemaTypes.ObjectId,
                    ref: "User",
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
