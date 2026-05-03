const express = require('express');
const app = express();

const dotenv = require('dotenv');
const createRouter = require('./routes/create');
dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.json());

app.use('/api/create', createRouter);
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});