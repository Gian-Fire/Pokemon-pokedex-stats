const express = require("express");
const axios = require("axios");

const app = express();

app.use(express.static("dist"));
app.use(express.json());

app.get("/pokemon", (req, res) => {
  axios.get("https://pokeapi.co/api/v2/pokemon?offset=0&limit=964")
    .then((pokemon) => {
      res.send(pokemon.data)
    })
    .catch( error => console.log(error))
});

app.get('/stats/:caughtPokemon', (req, res) => {
  const pokemonStats = req.params.caughtPokemon;

  axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonStats}`)
    .then((pokemon) => res.send(pokemon.data.stats))
    .catch(err => console.log(err))
});

app.get('/sprites/:caughtPokemon', (req, res) => {
  const pokemonSprite = req.params.caughtPokemon;

  axios.get(`https://pokeapi.co/api/v2/pokemon-form/${pokemonSprite}`)
    .then((pokemon) => res.send(pokemon.data.sprites))
    .catch(error => console.log(error))
});

module.exports = app;
