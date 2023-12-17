import React , {useState , useEffect } from "react";
import axios from "axios";
import './list.css'
import Pokecard from "../pokecard/Pokecard";

 function GetList(){

   
//    const [isLoading , setIsLoading] = useState(false)
//    const [pokemonList , setPokemonList] = useState([])
//    const [pokedexURL , setPokdexURL] = useState('https://pokeapi.co/api/v2/pokemon')
//    const [ prevURL,setprevURL] = useState('')
//    const [ nextURL,setnextURL] = useState('')
//    const [ pageNo , setPage] = useState(1);


   const [pokemonListState , setPokemonlistState] = useState({

    isLoading:true,
    pokemonList:[],
    pokedexURL:'https://pokeapi.co/api/v2/pokemon',
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


   const scrollToTop = () =>{
   
   
      window.scrollTo({
         top:0,
         behavior:"smooth"
      })
   }

    return(
 
        <div className="list-wrapper"> 
      
      { pokemonListState.isLoading ? <div class="lds-ring"><div></div><div></div><div></div><div></div></div> : <></> }

        <div className="wrapper"> 
        {pokemonListState.pokemonList.map((individual)=> <Pokecard name={individual.name} image={individual.image} type={individual.type} key={individual.id} id={individual.id} /> ) }

       
        </div>
         
         <div className="control">
         <button disabled = {pokemonListState.prevURL == null} onClick={()=>{
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