const express = require('express');
const sha256 = require('crypto-js/sha256');
const wrap = require('../../common/errors/async-error-wrapper');
const userService = require('./user.service');

const router = express.Router();

router.post('/create',
    wrap(async(req, res) => {
        const user = {...req.body, password: sha256(req.body.password.toString()).toString()}
        const result = await userService.create(user);
        res.json({message: result});
    })
)

router.post('/login',
    wrap(async(req, res) => {
        const user = {...req.body, password: sha256(req.body.password.toString()).toString()};
        const result = await userService.login(user);
        if(!result.ok) res.status(500);
        res.json(result);
    })
);

module.exports = router;