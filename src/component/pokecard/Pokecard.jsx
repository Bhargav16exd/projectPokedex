import { useState } from "react";
import "../pokecard/pokecard.css"
import {Link} from "react-router-dom"

function Pokecard ({ name , image , type , id ,flag}) {

    const [ load , setLoad] = useState(true);

   
    const caller = () =>{
        setLoad(false)
    }
    


    return(
        <>

        {
            flag ? 
            <>
            <div className="pokemon">
            <h2>{name}</h2>
            {load ?  <span className="loader"></span>: null}
            <img src={image} alt="" className="img" onLoad={caller} />
            </div>

            </>:<>
            <Link to={`/pokemon/${id}`}>
            <div className="pokemonCard">
            <p>{name}</p>
            {load ?  <span className="loader"></span>: null}
             <img src={image} alt="" className="img" onLoad={caller} />
           <p>{type}</p>
           </div>
           </Link>
            </>
        }

       
        </>
    );
}

export default Pokecard;