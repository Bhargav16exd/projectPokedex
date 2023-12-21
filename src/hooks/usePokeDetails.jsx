import axios from "axios"
import { useEffect, useState } from "react"

function usePokeDetails (id,dataName){
 

    const [ pokeDetails ,setPokeDetails] = useState({
        pokemonData:{types:[]},
        load:true,
        type:[],
        searchLoad:true
       })
      
       const caller = () =>{
       setPokeDetails((data)=>({
            ...data,
            load:false
        }))

        } 

       async function getData(){
        let Data =null;
        console.log("data value" , pokeDetails.searchLoad);
        try {  
            if(dataName){
                Data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${dataName}/` )
                if(Data){
                    setPokeDetails((data)=>({
                        ...data,
                        searchLoad:false
                    }))
                }

            }
            else{
                 Data = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
                 if(Data){
                    setPokeDetails((data)=>({
                        ...data,
                        searchLoad:false
                    }))
                }
            }
            
            console.log("data value 2" , pokeDetails.searchLoad); 
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

       useEffect(()=>{ getData()}, [pokeDetails.type ,pokeDetails.searchLoad ])

    return [pokeDetails ,caller]
}

export default usePokeDetails;