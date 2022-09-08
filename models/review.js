const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReviewSchema = new Schema(
    {
        userId: {
            type: Number,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);

const Review = mongoose.model("Review", ReviewSchema);
module.exports = Review;
