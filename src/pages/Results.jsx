import { useParams, Link } from "react-router-dom"
import { useEffect, useState } from "react";

function Results() {
    const { id } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [active, setActive] = useState('Movies');

    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])

    useEffect(()=> {
        const options = {
            method: 'GET',
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2RmYjVlYTYzY2UxZmVkNGE0NzJhM2ZkMTU1NjRlNCIsInN1YiI6IjY1MWI4M2UyMjIzYThiMDBlMWZiMGEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kO5DWYSmhfdU4rh4LqsVpvYeEbism1JjuZzZ4u6_e9o'
            }
          };
          
          async function fetchSearchData() {
            await fetch(`https://api.themoviedb.org/3/search/multi?query=${id}&include_adult=false&language=en-US&page=1`, options)
                .then(response => response.json())
                .then(response => setSearchResults(response.results))
                .catch(err => console.error(err));
          }

          console.log(searchResults);
          fetchSearchData();
          
    }, [id]);
    
    return (
        <>
        <button className={`rounded px-4 py-1 mr-2 ${active === 'Movies' ? 'bg-peach text-white' : 'bg-gray-200 text-gray-400'}`}
        onClick={() => setActive('Movies')}>Movies</button>
        <button className={`rounded px-4 py-1 mr-2 ${active === 'TV' ? 'bg-peach text-white' : 'bg-gray-200 text-gray-400'}`}
        onClick={() => setActive('TV')}>TV</button>
        {active === 'TV' ?
        <div className="flex flex-col gap-4 pb-6 mt-8">
            {searchResults.map((result) => {
                return result.poster_path !== null && result.overview != "" && result.hasOwnProperty("name") ?
                <Link to={`/${result.name.replace(/[&:']/g,'').replace(/-/g,'').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`} state={result} key={result.id}>
                    <button className="flex bg-zinc-800 p-4 rounded text-left items-center w-full">
                        <img className="h-fit w-fit rounded max-h-48" src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}></img>
                        <div className="flex ml-8 flex-col">
                            <h1 className="text-white text-3xl font-bold">{result.name}</h1>
                            {result.release_date != undefined &&
                                <p className="text-white">{`${result.release_date.slice(0, 4)}`}</p>
                            }
                            <p className="text-white mt-6 line-clamp-2" >{result.overview}</p>
                        </div>
                    </button>
                </Link>      
                : null
            })}
        </div> :
        <div className="flex flex-col gap-4 pb-6 mt-8">
            {searchResults.map((result) => {
                return result.poster_path !== null && result.overview != "" && result.hasOwnProperty("title") ?
                <Link to={`/${result.title.replace(/[&:']/g,'').replace(/-/g,'').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`} state={result} key={result.id}>
                    <button className="flex bg-zinc-800 p-4 rounded text-left items-center w-full">
                        <img className="h-fit w-fit rounded max-h-48" src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}></img>
                        <div className="flex ml-8 flex-col">
                            <h1 className="text-white text-3xl font-bold">{result.title}</h1>
                            {result.release_date != undefined &&
                                <p className="text-white">{`${result.release_date.slice(0, 4)}`}</p>
                            }
                            <p className="text-white mt-6 line-clamp-2" >{result.overview}</p>
                        </div>
                    </button>
                </Link>      
                : null
            })}
        </div>
        }
        </>
    )
    
}

export default Results