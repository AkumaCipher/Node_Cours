const axios = require("axios").default;
const conf = require("../../conf.json")
// Utilisation de la clé api
const apikey = conf.apikey

const options = {
  method: "GET",
  url: "http://www.omdbapi.com/",
  params: {s: "The 100", apikey: apikey},
};

axios
  .request(options)
  .then(function (response) {
    console.log(response.data);
  })
  .catch(function (error) {
    console.error(error);
  });
