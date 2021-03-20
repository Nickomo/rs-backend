const ratingRepo = require('./rating.repository');

const setRating = async (rating) => {
    return await ratingRepo.setRating(rating);
};

const getOne = async (placeId) => {
    return await ratingRepo.getRatingByPlaceId(placeId)
};

const getCurr = async (data) => {
    return await ratingRepo.getRatingByUserId(data)
};

module.exports = {
    setRating,
    getOne,
    getCurr,
};
