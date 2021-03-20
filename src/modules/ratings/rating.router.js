const express = require('express');
const wrap = require('../../common/errors/async-error-wrapper');
const ratingService = require('./rating.service');
const { DEFAULT_LANG } = require('../../common/config');
const { ENTITY_NAME } = require('./constants');

const router = express.Router();

router.get('/',
    wrap(async (req, res) => {
        const result = await ratingService.getOne(req.query.placeId);
        if(!result.ok) res.status(500);
        res.json(result);
    })
)

router.get('/curr',
    wrap(async (req, res) => {
        const result = await ratingService.getCurr({placeId: req.query.placeId, uid: req.cookies.uid});
        if(!result.ok) res.status(500);
        res.json(result);
    })
)

router.post('/add',
    wrap(async (req, res) => {
        const params = {...req.body, userId: req.cookies.uid};
        console.log(params);
        const result = await ratingService.setRating(params);
        if(!result.ok) res.status(401);
        res.json(result);
    })
)

module.exports = router;