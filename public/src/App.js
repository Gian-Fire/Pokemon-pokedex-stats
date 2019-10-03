import React, { useState } from "react";
import './styles.css';
import styled from "styled-components";

function App() {
  const [ searchPokemon, setSearchPokemon ] = useState('');
  const [ pocketMonster, setPocketMonster ] = useState({});
  const [ stats, setStats ] = useState([]);
  const [ sprites, setSprites ] = useState({});

  const CatchPocketMonster = (Catch, e) => {
    e.preventDefault();

    fetch('/pokemon')
      .then(res => res.json())
      .then(pokemon => pokemon.results.filter(pocketMonster => pocketMonster.name === Catch))
      .then(filteredPokemon => setPocketMonster(filteredPokemon[0]))
      .catch(err => console.log(err));

    caughtPokemonStats(Catch); 
    caughtPokemonSprite(Catch);
  };

  const caughtPokemonStats = (pokemonName) => {
    fetch(`/stats/${pokemonName}`)
      .then(res => res.json())
      .then((caughtPokemonData) => {
        setStats(caughtPokemonData);
      })
      .catch(err => console.log(err))
  };

  const caughtPokemonSprite = (pokemonName) => {
    fetch(`/sprites/${pokemonName}`)
    .then(res => res.json())
    .then((caughtPokemonSprites) => { 
      setSprites(caughtPokemonSprites);
    })
    .catch(err => console.log(err))
  }

  return (
    <>
      <Title>Pokedex Stat Tracker</Title>

      <Pokemon
        onSubmit={(e) => CatchPocketMonster(searchPokemon, e)}
      >
        <input
          type='text'
          name='pokemonName'
          placeholder='Name That Pokemon!'
          value={searchPokemon}
          onChange={ (e) => setSearchPokemon(e.target.value.toLowerCase())}
          required
        />
        <button
          type="submit"
        >
          <i>Catch It!</i>
        </button>
      </Pokemon>

      <div>

        <Title>
          {
            pocketMonster && pocketMonster.name
              ?
                pocketMonster.name.charAt(0).toUpperCase() + pocketMonster.name.slice(1)
              :
                'Please enter a valid pokemon name.'
          }
        </Title>

        <Sprite src={sprites.front_default}/>

        <Table>
          <tr>
            <th>
              Stat
            </th>
            <th>Value</th>
          </tr>
            {
              stats.map( (statsList, i) => {
                return (
                  <tr
                    key={i}
                  >

                    <td>
                      {statsList.stat.name} 
                    </td>
                    <td>
                      {statsList.base_stat}
                    </td>

                  </tr>
                )
              })
            }
        </Table>

      </div>
    </>
  );
};

export default App;

const Title = styled.h1`
  text-align: center;
  color: white;
  text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
`;

const Sprite = styled.img`
  border: 2px solid black;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
`;

const Table = styled.table`
  th {
    color: white;
    font-size: 1.5em;
    border: 2px solid black;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 5%
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  }

  td {
    color: white;
    font-size: 1.75em;
    border: 2px solid black;
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    width: 5%
    text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000;
  }

  border: 2px solid black;
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 25%
`;

const Pokemon = styled.form`
  input {
    border: 2px solid black;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }

  button {
    border: 2px solid black;
    color: black;
    display: block;
    margin-top: 5px;
    margin-left: auto;
    margin-right: auto;
  }
`;
