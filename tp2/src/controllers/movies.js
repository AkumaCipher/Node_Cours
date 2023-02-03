const {getCollection} = require("../services/db/connection");

const axios = require("axios").default;
const { getMovieByTitle } = require("../repositories/omdbapi");
const {
    findOne, insertOneUser, insertManyUsers, updateOne, findMany,
} = require("../services/db/crud");

async function insertMovie(req, res, next) {
    try {
        const result = await getMovieByTitle(req.query.t);
        const insert = await insertOneUser("movies",result);
        return res.send(insert);
    } catch (e) {
        console.log(e);
    }
}

module.exports = {
    insertMovie
}