import { useEffect, useState } from 'react';

function Popular() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularTV, setPopularTV] = useState([]);

    //Utilizing The Movie Database API
    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2RmYjVlYTYzY2UxZmVkNGE0NzJhM2ZkMTU1NjRlNCIsInN1YiI6IjY1MWI4M2UyMjIzYThiMDBlMWZiMGEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kO5DWYSmhfdU4rh4LqsVpvYeEbism1JjuZzZ4u6_e9o'
        }
    };

    //Fetch popular movies and store them in popularMovies array
    useEffect(()=> {
        async function fetchData() {
            let response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            response = await response.json();
        
            setPopularMovies(response.results);
        }

        fetchData()
        
    }, []);

    //Fetch popular tv and store them in popularTV array
    useEffect(()=> {
        async function fetchTVData() {
            let response = await fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=US', options)
            response = await response.json();
        
            setPopularTV(response.results);
        }

        fetchTVData()
        
    }, []);

      
    return (
        <>
        <h1 className="my-5 text-white text-4xl font-bold">Popular Movies</h1>
            <div className="flex overflow-x-auto">
                <div className="flex flex-nowrap items-start">
                    {popularMovies.map((movie) => {
                        return (
                            <button key={movie.id} className="relative max-w-[150px] w-max mr-5 text-left">
                                <img className="h-56 rounded" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}></img>
                                <p className="text-white mt-1 max-h-12 overflow-hidden">{movie.title}</p>
                            </button>
                        )
                    })}
                </div>
            </div>

        <h1 className="my-5 text-white text-4xl font-bold">Popular TV Shows</h1>
            <div className="flex overflow-x-scroll hide-scroll-bar">
                <div className="flex flex-nowrap items-start">
                    {popularTV.map((series) => {
                        return (
                            <button key={series.id} className="relative max-w-[150px] w-max mr-5 text-left">
                                <img className="h-56 rounded" src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}></img>
                                <p className="text-white mt-1 max-h-12 overflow-hidden">{series.name}</p>
                            </button>
                        )
                    })}
                </div>
            </div>
        </>
    )
}

export default Popular