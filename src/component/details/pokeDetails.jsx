
import { Link, useParams } from "react-router-dom";
import "../details/detail.css"
import usePokeDetails from "../../hooks/usePokeDetails";

     function Details ({dataName}){

        const {id} = useParams()

        const [pokeDetails ,caller] = usePokeDetails(id ,dataName);
      
    
        return(
            
           <div className="wrap-page">
            
            {pokeDetails.searchLoad ? 

            <span className="loadder">Loading ...</span> :
             
            <div className="pokewrap">
             <h2 className="name">Name : {pokeDetails.pokemonData.name}</h2>
            { pokeDetails.load ?  <span className="">Loading</span>: null}
             <img src={pokeDetails.pokemonData.image} alt="" className="image" onLoad={caller} />
             <div className="height">Height : {pokeDetails.pokemonData.height}</div>
             <div className="weight">Weight : {pokeDetails.pokemonData.weight}</div>
             <div className="type"> Types :{<ul>{pokeDetails.pokemonData.types.map((t)=> <li key={t}>{t}</li>)}</ul>}</div>
            
            {
            
            pokeDetails.pokemonData.types ?  <> <Link to={`/pokemon/type/${pokeDetails.type}`}>

             <button className="Explorebtn">See More {pokeDetails.type} Type Pokemon</button>
             </Link></> :<></>
             
            }
         
           </div> 
           }
           </div>
        );
    }

    export default Details;