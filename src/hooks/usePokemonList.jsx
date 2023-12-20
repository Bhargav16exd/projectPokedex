import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(url){
 
    const [pokemonListState , setPokemonlistState] = useState({

        isLoading:true,
        pokemonList:[],
        pokedexURL:url,
        prevURL:"",
        nextURL:"",
        pageNo: 1,
    })

    async function getData (){
      

        const response = await axios.get(pokemonListState.pokedexURL);
        const pokemonResult = response.data.results;
  
        setPokemonlistState( (state) => ({ 
           ...state,
           nextURL:response.data.next ,
           prevURL:response.data.previous,
           isLoading: true,
           pokemonList: [],
          }))    

        const pokemonPromise = pokemonResult.map((pokemon) => axios.get(pokemon.url))

        const pokemonData = await axios.all(pokemonPromise)
        console.log(pokemonData);

        const ress = pokemonData.map((pokeData)=>{
           const pokemon = pokeData.data;

           return {
               name : pokemon.name,
               image : pokemon.sprites.other.dream_world.front_default,
               types : pokemon.types,
               id : pokemon.id
           }
        })

        setPokemonlistState( (state) => ({ 
            ...state,
            pokemonList:ress ,
            isLoading:false
           }))   
    
  } 

  useEffect( () => {
    getData();
   },[pokemonListState.pokedexURL])
  
      

  
     return [pokemonListState , setPokemonlistState];    
}

export default usePokemonList;