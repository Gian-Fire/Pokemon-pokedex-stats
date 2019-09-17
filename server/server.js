const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.static("dist"));
app.use(express.json());

app.get("/h", (req, res) => {
  axios.get("https://pokeapi.co/api/v2/pokemon")
    .then((pokemon) => {
      res.send(pokemon.data)
    })
    .catch( error => console.log(error))
});

module.exports = app;
