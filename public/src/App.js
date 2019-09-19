import React, { useState } from "react";
import styled from "styled-components";

function App() {
  const [ searchPokemon, setSearchPokemon ] = useState('');
  const [ pocketMonster, setPocketMonster ] = useState({});
  const [ stats, setStats ] = useState([]);

  const CatchPocketMonster = (Catch) => {
    fetch('/pokemon')
    .then(res => res.json())
    .then(pokemon => pokemon.results.filter(pocketMonster => pocketMonster.name === Catch))
    .then(filteredPokemon => setPocketMonster(filteredPokemon[0]))
    .catch(err => console.log(err));
    
    caughtPokemonStats('1');
  };

  /* TODO:

    - REPLACE HARDCODED '1' in caughtPokemonStats function (line 16) 
      WITH DYNAMIC VALUE
    - STYLE PAGE


  */

  const caughtPokemonStats = (pokemonID) => {
    fetch(`/stats/${pokemonID}`)
      .then(res => res.json())
      .then( (caughtPokemonData) => {
        setStats(caughtPokemonData);
      })
      .catch(err => console.log(err))
  };

  return (
    <>
      <Title>Pokemon</Title>

      <Pokemon>
        <input
          type='text'
          placeholder='Pokemon'
          value={searchPokemon}
          onChange={ (e) => setSearchPokemon(e.target.value.toLowerCase())}
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
  }


  button {
    color: tomato;
    border-color: tomato;
    text-align: center;
  }

  display: block;
  margin: center;
`
