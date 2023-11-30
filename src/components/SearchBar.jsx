import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function SearchBar() {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    function handleSearch(event) {
        event.preventDefault();
        navigate("/search/" + event.target.search.value);
        
    }

    return(
        <form className="w-1/2" onSubmit={handleSearch}>   
            <label htmlFor="search" className="mb-2 font-medium text-gray-900 sr-only">Search</label>
            <div className="relative">
                <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                    <svg className="w-5 h-5 text-gray-900" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                    </svg>
                </div>
                <input type="search" value={searchQuery} id="search" onChange={(e)=>{setSearchQuery(e.target.value);}}className="w-full block w-full py-2.5 pl-16 text-gray-800 border rounded-full bg-gray-50 focus:outline-none focus:ring-peach focus:border-peach" placeholder="Look Up Movies & TV Shows..." required></input>
                <button type="submit" className="text-white absolute right-2.5 bottom-2 bg-peach hover:bg-peach-dark focus:ring-4 focus:outline-none focus:ring-peach font-medium rounded-full px-6 py-1">Search</button>
            </div>
        </form>
       
    )
}

export default SearchBar