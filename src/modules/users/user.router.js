const express = require('express');
const sha256 = require('crypto-js/sha256');
const wrap = require('../../common/errors/async-error-wrapper');
const userService = require('./user.service');
const cloudinary = require('cloudinary').v2;
const multer = require('multer');

const router = express.Router();
const defaultPhoto ='https://res.cloudinary.com/rs-travelapp/image/upload/v1615998773/default_ts3gls.png';


function setAuthorizedCookies(res, result) {
    res.cookie('uid', result.userId, {httpOnly: true, expires: new Date(Date.now() + 1000 * 86_400 * 10), secure: true, sameSite: 'none', domain:'app.com'});
    res.cookie('authorized', true, {expires: new Date(Date.now() + 1000 * 86_400 * 10), secure: true, sameSite: 'none', domain: 'app.com'});
}

router.post('/create',
    wrap(async(req, res) => {
        let photo = {};
        if(req.file) {
            photo = await cloudinary.uploader.upload(req.file.path);
        }
        const user = {...req.body, photoUrl: photo.url || defaultPhoto, password: sha256(req.body.password.toString()).toString()}
        const result = await userService.create(user);

        if(!result.ok) res.status(500);
        setAuthorizedCookies(res, result);

        const {userId, ...json} = result;
        res.json(json);
    })
)

router.post('/login',
    wrap(async(req, res) => {
        const user = {...req.body, password: sha256(req.body.password.toString()).toString()};
        const result = await userService.login(user);

        if(!result.ok) res.status(500);
        setAuthorizedCookies(res, result);

        const {userId, ...json} = result;
        res.json(json);
    })
);

router.get('/unlogin',
    wrap(async(req, res) => {
        res.clearCookie('uid');
        res.clearCookie('authorized');
        res.json({message: "User succesfully unlogined"});
    })
)

module.exports = router;