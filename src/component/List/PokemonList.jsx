import React , {useState , useEffect } from "react";
import './list.css'
import Pokecard from "../pokecard/Pokecard";
import usePokemonList from "../../hooks/usePokemonList";
import { useParams } from "react-router-dom";


 function GetList({API}){
   
 
  if(API){
   const type = useParams();
   API = `https://pokeapi.co/api/v2/type/${type.type}`
  }
   
   const [pokemonListState , setPokemonlistState] = usePokemonList( API ? {url:API , pageType:'typePage'}: { url:"https://pokeapi.co/api/v2/pokemon" , pageType:'homePage' } );
  
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