const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, {
}).then(() => { console.log('Connected to MongoDB') }).catch(err => console.error(err));


app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

const routes = require('./routes');
app.use('/api', routes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});