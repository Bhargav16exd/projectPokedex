import { Routes ,Route} from "react-router-dom";
import Pokedex from "../component/pokedex/pokedex";
import Details from "../component/details/pokeDetails";
import TypePage from "../component/typePage/typePage";

function Routing(){

    return(
        <Routes>

            <Route path="/" element={<Pokedex />} />
            <Route path="/pokemon/:id"  element={<Details/>}/>
            <Route path="/pokemon/type/:type" element={ <TypePage/>}/>

          
            
        </Routes>
    );
}

export default Routing;