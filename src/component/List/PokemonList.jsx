import React , {useState , useEffect } from "react";
import axios from "axios";
import './list.css'
import Pokecard from "../pokecard/Pokecard";
import usePokemonList from "../../hooks/usePokemonList";

 function GetList(){

 const [pokemonListState , setPokemonlistState] = usePokemonList('https://pokeapi.co/api/v2/pokemon');

   const scrollToTop = () =>{
      window.scrollTo({
         top:0,
         behavior:"smooth"
      })
   }

    return(
 
        <div className="list-wrapper"> 
      
       { pokemonListState.isLoading ? <div className="lds-ring"><div></div><div></div><div></div><div></div></div> : <></> }

        <div className="wrapper"> 
        {pokemonListState.pokemonList.map((individual)=> <Pokecard name={individual.name} image={individual.image} type={individual.type} key={individual.id} id={individual.id} /> ) }

       
        </div>
         
         <div className="control">
         <button 
         disabled = {pokemonListState.prevURL == null} 
         onClick={()=>{
            setPokemonlistState({...pokemonListState, pokedexURL:pokemonListState.prevURL , pageNo:pokemonListState.pageNo-1}),
            scrollToTop()
            }}>Previous</button>
          { pokemonListState.pageNo }
         <button disabled = {pokemonListState.nextURL == null} onClick={()=>{
            setPokemonlistState({...pokemonListState, pokedexURL:pokemonListState.nextURL, pageNo:pokemonListState.pageNo+1}),
            scrollToTop()
            }}>Next</button>
         </div>
         
        </div>
     
    );

}

export default GetList;