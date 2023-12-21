import './search.css'

function Search ({updateSearchTerm}){
    
   
    return(
        <div className="search-wrapper">

        <input 

        type="text"
        placeholder="enter pokemon..." 
        id="search"
        onChange={(event)=> updateSearchTerm(event.target.value) } 
        />

        </div>
    
    );


}

export default Search;

