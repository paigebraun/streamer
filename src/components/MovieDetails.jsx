import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import playBtn from "../assets/play.svg"

function MovieDetails() {

    const location = useLocation();
    const movie = location.state;

    //Convert minutes to hours and minutes
    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    }

    //Utilizing The Movie Database API
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2RmYjVlYTYzY2UxZmVkNGE0NzJhM2ZkMTU1NjRlNCIsInN1YiI6IjY1MWI4M2UyMjIzYThiMDBlMWZiMGEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kO5DWYSmhfdU4rh4LqsVpvYeEbism1JjuZzZ4u6_e9o'
        }
    };

    const [movieDetails, setMovieDetails] = useState([]);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [videos, setVideos] = useState([]);
    const [watchProviders, setWatchProviders] = useState([]);

    //Fetch movie details of the current movie
    useEffect(()=> {
        async function fetchData() {
            let response = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}?append_to_response=videos%2Ccredits&language=en-US`, options)
            response = await response.json();
            setMovieDetails(response);
            setCast(response.credits.cast);
            setCrew(response.credits.crew);
            setVideos(response.videos.results.find((item) => item.type == 'Trailer'));
        }

        async function fetchWatchData() {
            let watchResponse = await fetch(`https://api.themoviedb.org/3/movie/${movie.id}/watch/providers`, options)
            watchResponse = await watchResponse.json()
            setWatchProviders(watchResponse.results.US);
            console.log(watchResponse.results.US);
        }

        fetchData()
        fetchWatchData()

    }, []);

    return (
    <>
    <div className="relative">
        <div className="relative h-96 overflow-hidden rounded">
            <img className="absolute w-full" src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}></img>
            <div className="absolute h-full w-full bg-gradient-to-b from-transparent from-1% to-neutral-900 "></div>
        </div>
        <div className="grid grid-cols-3 mx-10 absolute top-40">
            <div className="col-span-1 flex flex-col flex-wrap content-center px-8">
                <img className="h-fit w-fit rounded max-h-96" src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}></img>
                <button className="text-white bg-peach rounded py-2 mt-6">Add To Watchlist</button>
            </div>
            <div className="col-span-2 mt-20 mb-10">
                <h1 className="text-white text-5xl font-bold">{movie.title}</h1>
                <p className="text-white">{`${movie.release_date.slice(0, 4)} · ${toHoursAndMinutes(movieDetails.runtime)}`}</p>
                <h3 className="text-white font-bold mt-6">Synopsis</h3>
                <p className="text-white">{movie.overview}</p>
                <h3 className="text-white font-bold mt-6">Where To Watch</h3>
                <p className="text-white">Currently in theaters. Not available to stream.</p>
                <h3 className="text-white font-bold mt-6">Trailer</h3>

                <div className="relative h-max w-max mt-1">
                    <a href={`https://www.youtube.com/watch?v=${videos.key}`} target="_blank">
                        <img className="w-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={playBtn}></img>
                        <img className="w-80 block rounded"src={`http://img.youtube.com/vi/${videos.key}/0.jpg`}></img>
                    </a>
                </div>
                
                <h3 className="text-white font-bold mt-6">Directors</h3>
                <ul>
                    {crew.map((director) => {
                        return director.job == 'Director' ?
                            <p className="text-white" key={director.credit_id}>{director.name}</p>
                        : null
                    })}
                </ul>
                <h3 className="text-white font-bold mt-6">Starring</h3>
                <ul>
                    {cast.slice(0, 10).map((actor) => {
                        return (
                            <p className="text-white" key={actor.credit_id}>{actor.name}</p>
                        )
                    })}
                </ul>
                
            </div>
        </div>
    </div>
    </>
    )
}

export default MovieDetails
