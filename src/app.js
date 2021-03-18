require('dotenv').config();
const path = require('path');
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const multer = require('multer');

const { StatusCodes, ReasonPhrases } = require('http-status-codes');

const errorMiddleware = require('./middleware/error-middleware');
const requestLogMiddleware = require('./middleware/request-logger');

const app = express();
const swaggerDoc = YAML.load(path.join(__dirname, './docs/doc.yaml'));

const loader = multer({dest: 'users/avatars/'});

const corsOptionsLocal = {
    origin: 'http://localhost:3001',
    credentials: true,
}

const corsOptionsHost = {
    origin: 'https://borodichalex-travel-app.netlify.app/',
    credentials: true,
}

app.use(cors(corsOptionsHost));
app.use(helmet());
app.use(express.json());
app.use(loader.single('photoUrl'))

app.use(requestLogMiddleware);

app.use('/favicon.ico', (req, res) => res.sendStatus(StatusCodes.NO_CONTENT));
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDoc));

// Routers
const countryRouter = require('./modules/countries/country.router');
const placeRouter = require('./modules/places/place.router');
const usersRouter = require('./modules/users/user.router');
const ratingsRouter = require('./modules/ratings/rating.router');

app.use('/countries', countryRouter);
app.use('/places', placeRouter);
app.use('/users', usersRouter);
app.use('/ratings', ratingsRouter);

app.use((req, res) => {
    res.status(StatusCodes.NOT_IMPLEMENTED).send(ReasonPhrases.NOT_IMPLEMENTED);
});

app.use(errorMiddleware);

module.exports = app;
