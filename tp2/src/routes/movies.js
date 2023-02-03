const express = require("express");
const {insertMovie} = require("../controllers/movies");
const router = express.Router();

router.post("/insert", insertMovie);

module.exports = router;