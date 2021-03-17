const express = require('express');
const sha256 = require('crypto-js/sha256');
const wrap = require('../../common/errors/async-error-wrapper');
const userService = require('./user.service');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const router = express.Router();
const defaultPhoto ='https://res.cloudinary.com/rs-travelapp/image/upload/v1615998773/default_ts3gls.png';




router.post('/create',
    wrap(async(req, res) => {
        let photo = {};
        if(req.file) {
            photo = await cloudinary.uploader.upload(req.file.path);
        }
        const user = {...req.body, photoUrl: photo.url || defaultPhoto, password: sha256(req.body.password.toString()).toString()}
        const result = await userService.create(user);

        if(!result.ok) res.status(500);
        res.json(result);
    })
)

router.post('/login',
    wrap(async(req, res) => {
        const user = {...req.body, password: sha256(req.body.password.toString()).toString()};
        console.log(req.body)
        const result = await userService.login(user);
        if(!result.ok) res.status(500);
        res.json(result);
    })
);

module.exports = router;