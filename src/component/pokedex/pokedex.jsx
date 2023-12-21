import { useState } from 'react';
import GetList from '../List/PokemonList';
import Search from '../search/Search';
import './pokedex.css'
import Details from '../details/pokeDetails';
function Pokedex ({API}){

    const [searchTerm , setSearchTerm] = useState('');

    return(
     

    <div className="pokedex-wrapper">
     

    {
        API ?  
        <GetList API={API}/> 
        : 
        ( <> <h1 className="h1">Pokedex</h1> 
        
        <Search  updateSearchTerm={setSearchTerm} /> 
        
        {searchTerm ? <Details dataName={searchTerm} key={searchTerm}/> : <GetList/>}  </> )
    }
     
     
    </div>
);

}

export default Pokedex;