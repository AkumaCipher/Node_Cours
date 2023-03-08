const express = require("express");
const {insertMovie, createWatchlist, addMovieInWatchlist} = require("../controllers/movies");
const router = express.Router();

router.post("/insert", insertMovie);

router.post("/createWatchlist", createWatchlist);

router.post("/addMovie", addMovieInWatchlist);

module.exports = router;