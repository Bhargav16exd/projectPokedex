import GetList from "../List/PokemonList";
import Pokedex from "../pokedex/pokedex";

function TypePage(){

    return(
        <>
        
        <Pokedex  API={`https://pokeapi.co/api/v2/type/:type`}/>

        </>
    )
}

export default TypePage;