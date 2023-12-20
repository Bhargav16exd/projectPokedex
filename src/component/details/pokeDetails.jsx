import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "../details/detail.css"

     function Details (){

       const {id} = useParams()

       const [pokemonData , setPokemonData] = useState({ types:[]});
       const [ load , setLoad] = useState(true);
       const [type , setType] = useState([]);
       const [ flag ,setFlag] = useState(false);
       const caller = () =>{
        setLoad(false)
        }

       async function getData(){
        try {

            const Data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
          
            setPokemonData({

                name : Data.data.name,
                image:Data.data.sprites.other.dream_world.front_default,
                height:Data.data.height,
                weight:Data.data.weight,
                types:Data.data.types.map((t)=> t.type.name)

            });
           }
            catch (error)
           {
            return("Cannot Fetch Data Try Again Later");
           }
           
           console.log(pokemonData.types)
           if(pokemonData.types){
            console.log(`flag`)
            setType(pokemonData.types[0])
           }
           console.log(type)
           

       }

       useEffect(()=>{ getData();}, [type])
      
       
        return(
            
           <div className="wrap-page">
            
            <div className="pokewrap">
             <h2 className="name">Name : {pokemonData.name}</h2>
             {load ?  <span className="">Loading</span>: null}
             <img src={pokemonData.image} alt="" className="image" onLoad={caller} />
             <div className="height">Height : {pokemonData.height}</div>
             <div className="weight">Weight : {pokemonData.weight}</div>
             <div className="type"> Types :{<ul>{pokemonData.types.map((t)=> <li key={t}>{t}</li>)}</ul>}</div>
            
            {
            
            pokemonData.types ?  <> <Link to={`/pokemon/type/${type}`}>

             <button className="Explorebtn">See More {type} Type Pokemon</button>
             </Link></> :<></>
             
            }
            
           </div> 
           </div>
        );
    }

    export default Details;