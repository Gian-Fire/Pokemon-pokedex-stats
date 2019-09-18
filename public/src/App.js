import React, { useState } from "react";
import styled from "styled-components";

function App() {
  const [ searchPokemon, setSearchPokemon ] = useState('');
  const [ pocketMonster, setPocketMonster ] = useState({});
  // const [ stats, setStats ] = useStates({});

  const CatchPocketMonster = (Catch) => {
    fetch('/pokemon')
    .then(res => res.json())
    .then(pokemon => pokemon.results.filter(pocketMonster => pocketMonster.name === Catch))
    .then(filteredPokemon => setPocketMonster(filteredPokemon[0]))
    .then(selectedPokemon => selectedPokemon.url)
    //trying to go into that url then 
    // do the same but display all stats in the new object
    // url => new obj. find stats array
    // then display all stats
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
        {/* <p> { stats.stats } </p> */}
        {/* There is also an error when first letter is capitalized. All character
        needs to be lower cased and I think I'll try to get that going.
         */}
        
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