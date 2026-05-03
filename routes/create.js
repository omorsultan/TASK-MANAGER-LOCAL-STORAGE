const {create, update, read, deleter } = require("../controller/CRUD")

const express = require('express');
const createRouter = require('express').Router();

createRouter.post('/', create);

module.exports = createRouter;