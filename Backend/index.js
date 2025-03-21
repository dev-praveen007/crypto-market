const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const mainRoute = require("./routes/main.route");
const { connectRedis } = require('./utils/redisConnector');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(helmet());

const limiter = rateLimit({
    windowMs: 10 * 60 * 1000,
    max: 100,
    message: "Too many requests, please try again later."
});

app.use(limiter);

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

connectRedis();

const corsOptions = {
    origin: ['http://localhost:3000', 'http://localhost:3001'], // Allow specific frontend
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
};

app.use(cors(corsOptions));
app.use(morgan('dev'));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Backend is running');
});

app.use("/api", mainRoute)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
