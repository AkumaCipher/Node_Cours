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

async function createWatchlist(req, res, next) {
    try {
        let user = await findOne("users", { name: req.query.n });
        let verifUser = await findOne("watchlists", { 'User.name': user.name });
        console.log(verifUser);
        if (verifUser) {
            let verifWatchlist = await findOne("watchlists", { Watchlists: req.query.w })
            if (verifWatchlist) {
                res.status(409).send(`Erreur : L'utilisateur ${user.name} à déjà une watchlist appelé ${req.query.w}`);
            }
            else {
                let filter = {
                    User: user
                };

                let update = {
                    $push: {
                        Watchlists: {
                            [req.query.w]: []
                        }
                    }
                };

                let insert = await updateOne("watchlists", filter, update);
                return res.send(insert);
            }
        }
        else {
            let result = {
                "User": user,
                "Watchlists": [{
                    [req.query.w]: []
                }]
            }
            const insert = await insertOneUser("watchlists", result);
            return res.send(insert);
        }
    }
    catch (e) {
        console.log(e);
    }
}

async function addMovieInWatchlist(req, res, next){
    try {
        let movie = await findOne("movies",{Title: req.query.n});
        console.log(movie);
        let filter = {
            User: req.query.u,
            Watchlists: {[req.query.w]:[]}
        }
        let update = {
            $push:
            movie
        }
        const insert = await updateOne("watchlists", filter, update, {upsert:true})
        return res.send(insert);
    }
    catch (e){
        console.log(e);
    }
}

module.exports = {
    insertMovie,
    createWatchlist,
    addMovieInWatchlist
};
