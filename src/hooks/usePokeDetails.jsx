import axios from "axios"
import { useEffect, useState } from "react"

function usePokeDetails (id){

    
    const [ pokeDetails ,setPokeDetails] = useState({
        pokemonData:{types:[]},
        load:true,
        type:[]
       })
      
       const caller = () =>{
        
        setPokeDetails((data)=>({
            ...data,
            load:false
        }))

        }

       async function getData(){
        try {

            const Data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
             
            setPokeDetails((data)=>({
                ...data,
                pokemonData:{
                    name : Data.data.name,
                    image:Data.data.sprites.other.dream_world.front_default,
                    height:Data.data.height,
                    weight:Data.data.weight,
                    types:Data.data.types.map((t)=> t.type.name)
                }
            }))
            
           }
        catch (error)
        {
          return("Cannot Fetch Data Try Again Later");
        }
           
          
           if(pokeDetails.pokemonData.types){
            console.log(`flag`)
            setPokeDetails((data)=>({
                ...data,
                type:pokeDetails.pokemonData.types[0]
            }))
           }
           console.log(pokeDetails.type)
           

       }

       useEffect(()=>{ getData();}, [pokeDetails.type])

    return [pokeDetails ,caller]
}

export default usePokeDetails;