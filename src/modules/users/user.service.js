const userRepo = require('./user.repository');

const create = async (user) => {
    return await userRepo.create(user);
};

const login = async (user) => {
    return await userRepo.login(user);
};


module.exports = {
    create,
    login,
};
