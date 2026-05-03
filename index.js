const express = require('express');
const app = express();

const dotenv = require('dotenv');
const Route = require('./routes/CRUD');


dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/', Route);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});