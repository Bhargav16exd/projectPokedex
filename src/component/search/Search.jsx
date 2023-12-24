import useDebounce from '../../hooks/useDebounce';
import './search.css'

function Search ({updateSearchTerm}){
    
    const debouncedCallBack = useDebounce((event)=> updateSearchTerm(event.target.value),2000)
   
    return(
        <div className="search-wrapper">

        <input 

        type="text"
        placeholder="enter pokemon..." 
        id="search"
        onChange={debouncedCallBack} 
        
        
        />

        </div>
    
    );


}

export default Search;

