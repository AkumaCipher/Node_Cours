const { express } = require("express");
const express = require("express");
const error = require("./error.json");
const app = express();
const port = 4000;

var uptime = Math.round(process.uptime());
var list = {
  status: "healthy",
  requestsCount: {
    "/": 0,
    "/welcome": 0,
    "/secret": 0,
    "/redirectMe": 0,
    "/massias": 0,
    "/error": 0,
    "/img": 0,
    "/somme": 0,
    "/users": 0,
    "/metrics":0,
  },
  uptime: uptime,
};

app.use("/", function (req, res, next) {
  var date = new Date().toISOString();
  var url = req.url;
  console.log(`[${date}] : ${url}`);
  next();
});

app.use("/", function (req, res, next) {
  var requests = req.url.split('/');
  var request = `/${requests[1]}`;
  var au_cas_ou = request.split('?');

  if (au_cas_ou[0]=="somme"){
    request = `/${au_cas_ou[0]}`;
  }

  list['requestsCount'][request]++;

  next();
});

app.get("/massias", (req, res) => {
  res.send("Hello World!");
});

app.get("/welcome", (req, res) => {
  res.send("Bienvenue sur le TP1 d'architecture logicielle!");
});

app.get("/secret", (req, res) => {
  res
    .status(401)
    .send("Vous ne possédez pas les droits pour accéder à ma page secrète.");
});

app.get("/error", (req, res) => {
  res.status(500).json(error);
});

app.get("/img", (req, res) => {
  res.download("C:/Travail/Cours_BUT/Nodejs/Node_Cours/tp1/images/mario.png");
});

app.get("/redirectMe", (req, res) => {
  res.redirect("https://www.iut-littoral.fr");
});

app.get("/users/:name", (req, res) => {
  res.send("Bienvenue sur la page de " + req.params.name);
});

app.get("/somme", (req, res) => {
  res.send("Somme = " + (parseInt(req.query.a) + parseInt(req.query.b)));
});

app.get("/metrics", (req,res) =>{
  res.json(list);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
