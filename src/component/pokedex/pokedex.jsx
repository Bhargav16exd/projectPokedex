import GetList from '../List/PokemonList';
import Search from '../search/Search';
import './pokedex.css'
function Pokedex ({API}){

return(
     
    <div className="pokedex-wrapper">
    
    {
        API ?  <GetList API={API}/> : ( <> <h1 className="h1">Pokedex</h1> <Search/> <GetList/> </> )
    }
   
    </div>
);

}

export default Pokedex;