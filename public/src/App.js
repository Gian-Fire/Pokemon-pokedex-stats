import React, { useState } from "react";
import styled from "styled-components";

function App() {
  const [ searchPokemon, setSearchPokemon ] = useState('');
  const [ pocketMonster, setPocketMonster ] = useState({});
  const [ stats, setStats ] = useState([]);
  const [ sprite, setSprite ] = useState({});

  const CatchPocketMonster = (Catch) => {
    fetch('/pokemon')
    .then(res => res.json())
    .then(pokemon => pokemon.results.filter(pocketMonster => pocketMonster.name === Catch))
    .then(filteredPokemon => setPocketMonster(filteredPokemon[0]))
    .catch(err => console.log(err));

    caughtPokemonStats(Catch); 
  };

  const caughtPokemonStats = (pokemonName) => {
    fetch(`/stats/${pokemonName}`)
      .then(res => res.json())
      .then((caughtPokemonData) => {
        setStats(caughtPokemonData);
      })
      .catch(err => console.log(err))
  };

  // const pokemonSprite = (pokeSprite) => {
  //   fetch()
  //     .then()
  //     .then()
  //     .catch(err => console.log(err));
  // }
  
    
    /* TODO:
  
      - STYLE PAGE
  
    */
  return (
    <>
      <Title>Pokemon</Title>

      <Pokemon>
        <input
          type='text'
          name='pokemonName'
          placeholder='Pokemon'
          value={searchPokemon}
          onChange={ (e) => setSearchPokemon(e.target.value.toLowerCase())}
          required
        />
        <button
          onClick={() => CatchPocketMonster(searchPokemon)}
        >
          Catch It!
        </button>
      </Pokemon>

      <div>

        <h1>
          Name That Pokemon: {pocketMonster.name}
        </h1>

        {/* <div>[sprite</div>
        place sprites here. 
        got error when i tried to call it due the the sprite being a link to a png
        */}


        <ul> 
        {
          stats.map( (statsList, i) => {
            return (
              <li key={i}>
                <h3>{statsList.stat.name}: </h3>
                <p>{statsList.base_stat}</p>
              </li>
              )
          })
        }
        </ul>

      </div>
    </>
  );
};

export default App;

const Title = styled.h1`
  text-align: center;
  color: palevioletred;
`
// const Input = styled.input`
//   border-color: green;
//   text-align: center;
// `
// const RedButton = styled.button`
//   color: tomato;
//   border-color: tomato;
//   text-align: center;
// `

const Pokemon = styled.div`
  input {
    border-color: green;
    text-align: center;
    display:inline-block
  }


  button {
    color: tomato;
    border-color: tomato;
    text-align: center;
    display:inline-block
  }

  display: block;
  margin: center;
  display:inline-block
`
