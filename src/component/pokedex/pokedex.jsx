import GetList from '../List/PokemonList';
import Search from '../search/Search';
import './pokedex.css'
function Pokedex ({API}){

return(
     
    <div className="pokedex-wrapper">
    <h1 className="h1">Pokedex</h1>
    <Search/>
    
    {
        API ? <GetList API={API}/> : <GetList/>
    }
   
    </div>
);

}

export default Pokedex;