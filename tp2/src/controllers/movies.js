const { getCollection } = require("../services/db/connection");

const axios = require("axios").default;
const { getMovieByTitle } = require("../repositories/omdbapi");
const {
    findOne,
    insertOneUser,
    insertManyUsers,
    updateOne,
    findMany,
} = require("../services/db/crud");

async function insertMovie(req, res, next) {
    try {
        const movie = await getMovieByTitle(req.query.t);
        let verif = await findOne("movies", { Title: movie.Title })
        if (verif) {
            res.status(409).send(`Erreur : Le film ${movie.Title} est déjà dans la base de données.`)
        }
        else {
            let result = {
                "Title": movie.Title,
                "Year": movie.Year,
                "Runtime": movie.Runtime,
                "Genre": movie.Genre,
                "Language": movie.Language,
                "Synopsis": movie.Plot,
            }
            const insert = await insertOneUser("movies", result);
            return res.send(insert);
        }
    }
    catch (e) {
        console.log(e);
    }
}

module.exports = {
    insertMovie,
};
