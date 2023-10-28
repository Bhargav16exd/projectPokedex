import { Routes ,Route} from "react-router-dom";
import Pokedex from "../component/pokedex/pokedex";
import Details from "../component/details/pokeDetails";

function Routing(){
    return(
        <Routes>

            <Route path="/" element={<Pokedex/>}/>
            <Route path="/pokemon/:id"  element={<Details/>}/>
            
        </Routes>
    );
}

export default Routing;