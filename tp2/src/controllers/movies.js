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
    let verif = await findOne("movies", { Title: movie.Title });
    if (verif) {
      res
        .status(409)
        .send(
          `Erreur : Le film ${movie.Title} est déjà dans la base de données.`
        );
    } else {
      let result = {
        Title: movie.Title,
        Year: movie.Year,
        Runtime: movie.Runtime,
        Genre: movie.Genre,
        Language: movie.Language,
        Synopsis: movie.Plot,
      };
      const insert = await insertOneUser("movies", result);
      return res.send(insert);
    }
  } catch (e) {
    console.log(e);
  }
}

async function createWatchlist(req, res, next) {
  try {
    let user = await findOne("users", { name: req.query.n });

    let verifUser = await findOne("watchlists", { "User.name": user.name });

    if (verifUser) {
      let verifWatchlist = await findOne("watchlists", { [req.query.w]: [] });

      if (verifWatchlist) {
        res
          .status(409)
          .send(
            `Erreur : L'utilisateur ${user.name} à déjà une watchlist appelé ${req.query.w}`
          );
      } else {
        let filter = {
          User: user,
        };

        let update = {
          $set: {
            [req.query.w]: [],
          },
        };

        let insert = await updateOne("watchlists", filter, update);
        return res.send(insert);
      }
    } else {
      let result = {
        Name: `La watchlist de ${req.query.n}`,
        User: user,
        [req.query.w]: [],
      };
      const insert = await insertOneUser("watchlists", result);
      return res.send(insert);
    }
  } catch (e) {
    console.log(e);
  }
}

async function addMovieInWatchlist(req, res, next) {
  try {
    /* n is for the name of the film, u is the user's name */
    let film = await findOne("movies", { Title: req.query.n });
    let watchlist = await findOne("watchlists", { "User.name": req.query.u });
    let movie = {
      Title: film.Title,
      Runtime: film.Runtime,
      Genre: film.Genre,
      Statut: "A voir",
    };
    watchlist.Movies.push(movie);
    const insert = await updateOne(
      "watchlists",
      { "User.name": req.query.u },
      { $set: { Movies: watchlist.Movies } }
    );
    return res.send(insert);
  } catch (e) {
    console.log(e);
  }
}

module.exports = {
  insertMovie,
  createWatchlist,
  addMovieInWatchlist,
};
