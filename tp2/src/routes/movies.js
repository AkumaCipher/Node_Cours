const express = require("express");
const {insertMovie, createWatchlist} = require("../controllers/movies");
const router = express.Router();

router.post("/insert", insertMovie);

router.post("/createWatchlist", createWatchlist);

module.exports = router;