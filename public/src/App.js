import React, { useState } from "react";
import styled from "styled-components";

function App() {
  const [ searchPokemon, setSearchPokemon ] = useState('');
  const [ pocketMonster, setPocketMonster ]= useState({});

  // const handleSearch = () => {
  //   const getPoke = {
  //     'Pokemon':searchPokemon
  //   }
  //   console.log(searchPokemon)
  //   return getPoke.Pokemon;
  // };

  const CatchPocketMonster = (Catch) => {
    fetch('/h')
    .then(res => res.json())
    .then(pokemon => pokemon.results.filter(pocketMonster => pocketMonster.name === Catch))
    .then(filteredPokemon => setPocketMonster(filteredPokemon))
    .catch(err => console.log(err));
  };

  return (
    <>
      <Title>Pokemon</Title>

          <Input
            type='text'
            placeholder='Pokemon'
            value={searchPokemon}
            onChange={ (e) => setSearchPokemon(e.target.value)}
          />
        <RedButton
          onClick={() => CatchPocketMonster(searchPokemon)}
        >
          Catch It!
        </RedButton>

        <h1>Name That Pokemon: {pocketMonster.name}</h1>
    </>
  );
};

export default App;

const Title = styled.h1`
  text-align: center;
  color: palevioletred;
`
const Input = styled.input`
  border-color: green;
  text-align: center;
`
const RedButton = styled.button`
  color: tomato;
  border-color: tomato;
  text-align: center;
`