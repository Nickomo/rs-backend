const express = require('express');
const wrap = require('../../common/errors/async-error-wrapper');
const placeService = require('./place.service');
const { DEFAULT_LANG } = require('../../common/config');
const { ENTITY_NAME } = require('./constants');

const router = express.Router();

router.get(
    '/',
    wrap(async (req, res) => {
        const lang = req.query.lang || DEFAULT_LANG;
        const data = await placeService.getAll(lang);
        res.send(data);
        console.log("object");
    })
);

// router.get(
//     '/:id',
//     wrap(async (req, res) => {
//         const lang = req.query.lang || DEFAULT_LANG;
//         const { id } = req.params;
//         const data = await countryService.getOne(id, lang);
//         res.json(data);
//     })
// );

module.exports = router;