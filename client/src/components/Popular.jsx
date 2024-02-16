import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';

const Popular = React.memo(() => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularTV, setPopularTV] = useState([]);

    const options = {
        method: 'GET',
        headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2RmYjVlYTYzY2UxZmVkNGE0NzJhM2ZkMTU1NjRlNCIsInN1YiI6IjY1MWI4M2UyMjIzYThiMDBlMWZiMGEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kO5DWYSmhfdU4rh4LqsVpvYeEbism1JjuZzZ4u6_e9o'
        }
    };

    // Use useCallback to memoize the fetchData function
    const fetchData = useCallback(async () => {
        let response = await fetch('https://api.themoviedb.org/3/trending/movie/day?language=en-US', options);
        response = await response.json();
        setPopularMovies(response.results);
        fetchTVData();
    }, []); 

    // Use useCallback to memoize the fetchTVData function
    const fetchTVData = useCallback(async () => {
        let response = await fetch('https://api.themoviedb.org/3/trending/tv/day?language=en-US', options);
        response = await response.json();
        setPopularTV(response.results);
    }, []); 

    // Fetch data on component mount
    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return (
        <>
            <h1 className="my-5 text-white text-4xl font-bold">Trending Movies</h1>
            <div className="flex overflow-x-auto">
                <div className="flex flex-nowrap items-start">
                    {popularMovies.map((movie) => (
                        <Link to={`/${movie.title.replace(/[&:']/g,'').replace(/-/g,'').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`} state={movie} key={movie.id}>
                            <button className="relative max-w-[150px] w-max mr-5 text-left">
                                <div className="relative h-56 rounded overflow-hidden">
                                    <img className="h-56 rounded hover:scale-110 transition duration-150 ease-out hover:ease-in" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}></img>
                                </div>
                                <p className="text-white mt-1 max-h-12 overflow-hidden">{movie.title}</p>
                            </button>
                        </Link>
                    ))}
                </div>
            </div>

            <h1 className="my-5 text-white text-4xl font-bold">Trending TV Shows</h1>
            <div className="flex overflow-x-scroll hide-scroll-bar">
                <div className="flex flex-nowrap items-start">
                    {popularTV.map((series) => (
                        <Link to={`/${series.name.replace(/[&:']/g,'').replace(/-/g,'').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`} state={series} key={series.id}>
                            <button className="relative max-w-[150px] w-max mr-5 text-left">
                                <div className="relative h-56 rounded overflow-hidden">
                                    <img className="h-56 rounded hover:scale-110 transition duration-150 ease-out hover:ease-in" src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}></img>
                                </div>
                                <p className="text-white mt-1 max-h-12 overflow-hidden">{series.name}</p>
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
});

export default Popular;
