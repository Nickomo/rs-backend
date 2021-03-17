const User = require('./user.schema');
const { MongoDuplicateError } = require('../../common/errors/errors-list');
const { ENTITY_NAME } = require('./constants');
const {
    COLLECTION_NAME: PLACE_COLLECTION_NAME,
} = require('./constants');
const { Types } = require('mongoose');



const create = async (user) => {
    let response = {message: "User already exists", ok: false};

    if(!await User.exists({login: user.login})) {
        const userId = await(await User.create(user)).get('_id');
        response = {...response, userId, ok: true};
    }

    return response;
}

const login = async (user) => {
    let response = { message: "Such user doesn't exists", ok: false };
    const userExists = await User.exists({login: user.login});
    const currUser = await User.findOne({login: user.login});

    if(userExists && user.password === await currUser.get('password')) {
        response = { message: "Login successfully", userId: await currUser.get('_id'), ok: true }
    }

    return response;
}

module.exports = {
    create,
    login
};
