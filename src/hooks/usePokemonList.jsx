import axios from "axios";
import { useEffect, useState } from "react";

function usePokemonList(incomingData ){
 
    const [pokemonListState , setPokemonlistState] = useState({

        isLoading:true,
        pokemonList:[],
        pokedexURL:incomingData.url,
        prevURL:"",
        nextURL:"",
        pageNo: 1,
    })
    

    async function getData (){
       
        
        
        if( incomingData.pageType == 'homePage' )
        {
        
        const response = await axios.get(pokemonListState.pokedexURL);
        console.log(response)
            
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
        else if( incomingData.pageType == 'typePage'){
        
         const response = await axios.get(pokemonListState.pokedexURL);
         const dataArray = response.data.pokemon
         const data = dataArray.map((dataArray)=> dataArray.pokemon.url)
         const sliceData = data.slice(0,10);
         const promiseArray =  sliceData.map((pokemon)=> axios.get(pokemon)) 
         const getDataFromPromiseArray = await axios.all(promiseArray);

         console.log(getDataFromPromiseArray)

         // Copied from above 
          
        const ress = getDataFromPromiseArray.map((pokeData)=>{
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
        
  } 

  useEffect( () => {
    getData();
   },[pokemonListState.pokedexURL])
  
 return [pokemonListState , setPokemonlistState];    
}

export default usePokemonList;