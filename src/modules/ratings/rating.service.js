const ratingRepo = require('./rating.repository');

const setRating = async (rating) => {
    return await ratingRepo.setRating(rating);
};

const getOne = async (placeId) => {
    return await ratingRepo.getRatingByPlaceId(placeId)
};

module.exports = {
    setRating,
    getOne,
};
