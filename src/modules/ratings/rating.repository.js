const Rating = require('./rating.schema');
const User = require('../users/user.schema');
const { NotFoundError } = require('../../common/errors/errors-list');
const { ENTITY_NAME } = require('./constants');
const {
    COLLECTION_NAME: PLACE_COLLECTION_NAME,
} = require('./constants');
const { Types } = require('mongoose');

const ratingExcludedFields = { _id: 0, __v: 0};
const userExcludedFields = {__v: 0, password: 0, login: 0 };

const setRating = async (rating) => {
    if(await Rating.exists({userId: rating.userId, placeId: rating.placeId})) {
        await Rating.updateOne({userId: rating.userId, placeId: rating.placeId}, {rating: rating.rating});
    } else {
        Rating.create(rating);
    }
    return {message: "Rating successfully added"};
}

const getRatingByPlaceId = async (placeId) => {
    let response = { ok: false };

    const usersId = (await Rating.find({placeId}, 'userId -_id')).map(el => Types.ObjectId(el.userId));

    if(usersId.length > 0) {
        const usersData = await User.aggregate().match({ _id: {$in: usersId}}).project(userExcludedFields);
        const ratings = await Rating.aggregate()
            .match({placeId: +placeId})
            .project(ratingExcludedFields);

        const result = ratings.map(el => {
            for (const user of usersData) {
                if(user._id == el.userId) {
                    const {userId, ...resultRates} = el;
                    const {_id, login, ...resultUser} = user;
                    const result = {...resultRates, user: resultUser};
                    return result;
                }
            }
        })
        response = {...response, data: result, ok: true};
    } else {
        response = {...response, message: "Ratings doesn't exists or invalid place id"}
    }

    return response;
}

module.exports = {
    setRating,
    getRatingByPlaceId,
};
