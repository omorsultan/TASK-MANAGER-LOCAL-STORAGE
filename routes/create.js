const express = require('express');
const createRouter = require('express').Router();

createRouter.post('/', (req, res) => {
  res.send('Hello from router');
});

module.exports = createRouter;