const express = require('express');
const wrap = require('../../common/errors/async-error-wrapper');
const { DEFAULT_LANG } = require('../../common/config');
const { ENTITY_NAME } = require('./constants');

const router = express.Router();

router.get(
    '/',
    wrap(async (req, res) => {
        const lang = req.query.lang || DEFAULT_LANG;
        const data = await countryService.getAll(lang);
        res.send(data);
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
