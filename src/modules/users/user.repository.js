const User = require('./user.schema');
const { MongoDuplicateError } = require('../../common/errors/errors-list');
const { ENTITY_NAME } = require('./constants');
const {
    COLLECTION_NAME: PLACE_COLLECTION_NAME,
} = require('./constants');
const { Types } = require('mongoose');



const create = async (user) => {
    let response = {message: "Account succesfully created"};

    if(await User.exists({login: user.login})) response.message = "User already exists";

    User.create(user);
    return response;
}

const login = async (user) => {
    let response = { message: "Such user doesn't exists", ok: false };
    const userExists = await User.exists({login: user.login});
    const currUser = await User.findOne({login: user.login});

    console.log(`user from post ${user.password}`);
    console.log(`user from db ${await currUser.get('password')}`)

    if(userExists && user.password === await currUser.get('password')) {
        response = { message: "Login successfully", userId: await currUser.get('_id'), ok: true }
    }

    return response;
}

module.exports = {
    create,
    login
};
