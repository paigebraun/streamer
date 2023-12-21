import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Lottie from 'lottie-react';
import logoLoad from '../assets/logoLoad.json'

function Popular() {
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularTV, setPopularTV] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        async function fetchData() {
            let response = await fetch('https://api.themoviedb.org/3/movie/popular?language=en-US&page=1', options)
            response = await response.json();
            setPopularMovies(response.results);
            fetchTVData()
        }
        async function fetchTVData() {
            let response = await fetch('https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=US', options)
            setIsLoading(true);
            response = await response.json();
            setPopularTV(response.results);
            setIsLoading(false);
        }
        fetchData()
        
        

    }, []);
      
    return (
     <>
        {isLoading ? 
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-neutral-900 z-20 w-full h-full'>
            <div className='w-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 '>
                <Lottie animationData={logoLoad} loop={true}></Lottie>
            </div>
        </div> 
        : 
        <>
        <h1 className="my-5 text-white text-4xl font-bold">Popular Movies</h1>
            <div className="flex overflow-x-auto">
                <div className="flex flex-nowrap items-start">
                    {popularMovies.map((movie) => {
                        return (
                            <Link to={`/${movie.title.replace(/[&:']/g,'').replace(/-/g,'').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`} state={movie} key={movie.id}>
                                <button className="relative max-w-[150px] w-max mr-5 text-left">
                                    <img className="h-56 rounded" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}></img>
                                    <p className="text-white mt-1 max-h-12 overflow-hidden">{movie.title}</p>
                                </button>
                            </Link>
                        )
                    })}
                </div>
            </div>

        <h1 className="my-5 text-white text-4xl font-bold">Popular TV Shows</h1>
            <div className="flex overflow-x-scroll hide-scroll-bar">
                <div className="flex flex-nowrap items-start">
                    {popularTV.map((series) => {
                        return (
                            <Link to={`/${series.name.replace(/[&:']/g,'').replace(/-/g,'').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`} state={series} key={series.id}>
                                <button className="relative max-w-[150px] w-max mr-5 text-left">
                                    <img className="h-56 rounded" src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}></img>
                                    <p className="text-white mt-1 max-h-12 overflow-hidden">{series.name}</p>
                                </button>
                            </Link>
                        )
                    })}
                </div>
            </div>
        </>
    }
    </>
    )
}

export default Popular