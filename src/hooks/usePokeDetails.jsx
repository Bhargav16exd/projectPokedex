import axios from "axios"
import { useEffect, useState } from "react"
let x = 0;

 function usePokeDetails(id,dataName){
 
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

        console.log("function called",x++)
        let Data =null;
    
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
            
            console.log(Data)
            setPokeDetails((data)=>({
                ...data,
                pokemonData:{
                    name : Data.data.name,
                    image:Data.data.sprites.other.dream_world.front_default,
                    height:Data.data.height,
                    weight:Data.data.weight,
                    types: Data.data.types.map((t)=> t.type.name)
                },
                type:Data.data.types[0].type.name
            }))
            
        }
        catch (error)
        {
          return("Cannot Fetch Data Try Again Later");
        }
}

    useEffect(()=>{ getData()},[])
       
    return [pokeDetails ,caller]
}

export default usePokeDetails;