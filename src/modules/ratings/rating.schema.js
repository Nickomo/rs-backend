const { Schema, model } = require('mongoose');

const ratingSchema = new Schema ({
    rating: {
        type: Number,
        required: true
    },
    userId: {
        type: String,
        required: true,
    },
    placeId: {
        type: Number,
        required: true,
    }
})

const Rating = model('Rating', ratingSchema);

module.exports = Rating;
