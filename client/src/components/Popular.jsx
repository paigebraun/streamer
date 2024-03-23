import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Popular = React.memo(() => {
    const [popularMovies, setPopularMovies] = useState([]);
    const [popularTV, setPopularTV] = useState([]);

    // Fetch popular movies and TV from server
    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const response = await fetch(
                    "https://streamer-backend-wi3f.onrender.com/popular/movies"
                );
                const data = await response.json();
                setPopularMovies(data);
            } catch (error) {
                console.error("Error fetching popular movies:", error);
            }
        };

        const fetchPopularTV = async () => {
            try {
                const response = await fetch(
                    "https://streamer-backend-wi3f.onrender.com/popular/tv"
                );
                const data = await response.json();
                setPopularTV(data);
            } catch (error) {
                console.error("Error fetching popular TV shows:", error);
            }
        };

        fetchPopularMovies();
        fetchPopularTV();
    }, []);

    return (
        <>
            <h1 className="my-5 text-white text-3xl font-bold">
                Trending Movies
            </h1>
            <div className="flex overflow-x-auto">
                <div className="flex flex-nowrap items-start gap-4">
                    {popularMovies.map((movie) => (
                        <Link
                            to={`/${movie.title
                                .replace(/[&:']/g, "")
                                .replace(/-/g, "")
                                .replace(/[^a-zA-Z0-9]/g, "-")
                                .toLowerCase()}`}
                            state={movie}
                            key={movie.id}>
                            <button className="relative max-w-[150px] w-max text-left">
                                <div className="relative h-56 rounded overflow-hidden">
                                    <img
                                        className="h-56 rounded hover:scale-110 transition duration-150 ease-out hover:ease-in"
                                        src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}></img>
                                </div>
                                <p className="text-white mt-1 max-h-12 overflow-hidden">
                                    {movie.title}
                                </p>
                            </button>
                        </Link>
                    ))}
                </div>
            </div>

            <h1 className="my-5 text-white text-3xl font-bold">
                Trending TV Shows
            </h1>
            <div className="flex overflow-x-scroll hide-scroll-bar">
                <div className="flex flex-nowrap items-start gap-4">
                    {popularTV.map((series) => (
                        <Link
                            to={`/${series.name
                                .replace(/[&:']/g, "")
                                .replace(/-/g, "")
                                .replace(/[^a-zA-Z0-9]/g, "-")
                                .toLowerCase()}`}
                            state={series}
                            key={series.id}>
                            <button className="relative max-w-[150px] w-max text-left">
                                <div className="relative h-56 rounded overflow-hidden">
                                    <img
                                        className="h-56 rounded hover:scale-110 transition duration-150 ease-out hover:ease-in"
                                        src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}></img>
                                </div>
                                <p className="text-white mt-1 max-h-12 overflow-hidden">
                                    {series.name}
                                </p>
                            </button>
                        </Link>
                    ))}
                </div>
            </div>
        </>
    );
});

export default Popular;
