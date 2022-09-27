const express = require("express");

const {
    addGasData,
    getAllGasData,
} = require("../controllers/gasdata.controllers.js");

const gdRouter = express.Router();

gdRouter.post("/add-gas", addGasData);
gdRouter.get("/all-gas", getAllGasData);

module.exports = gdRouter;
