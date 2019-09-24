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

app.get('/stats/:id', (req, res) => {
  const caughtPokemon = req.params.id;

  axios.get(`https://pokeapi.co/api/v2/pokemon/${caughtPokemon}`)
    .then((pokemon) => res.send(pokemon.data.stats))
    .catch(err => console.log(err))
});

// app.get('/sprites', (req, res) => {
//   const pokeSprite = req.params.id;

//   axios.get(`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/1.png`)
//     .then((pokemon) => res.send(pokemon.data.sprites))
//     .catch(error => console.log(error))
// });

module.exports = app;
