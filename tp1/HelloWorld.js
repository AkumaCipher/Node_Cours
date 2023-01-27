const express = require('express');
const error = require("./error.json");
const app = express();
const port = 4000;

app.get('/massias', (req, res) => {
  res.send('Hello World!');
})

app.get('/welcome', (req, res) => {
  res.send('Bienvenue sur le TP1 d\'architecture logicielle!');
})

app.get('/secret', (req, res) => {
  res.status(401).send("Vous ne possédez pas les droits pour accéder à ma page secrète.");
})

app.get('/error', (req, res) => {
  res.status(500).json(error);
})

app.get('/img', (req, res) => {
  res.download("C:/Travail/Cours_BUT/Nodejs/Node_Cours/tp1/images/mario.png");
})

app.get('/redirectMe', (req, res) => {
  res.redirect('https://www.iut-littoral.fr');
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})