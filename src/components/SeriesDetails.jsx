import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import playBtn from "../assets/play.svg"

function SeriesDetails() {

    const location = useLocation();
    const series = location.state;

    //Utilizing The Movie Database API
    const options = {
        method: 'GET',
        headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiM2RmYjVlYTYzY2UxZmVkNGE0NzJhM2ZkMTU1NjRlNCIsInN1YiI6IjY1MWI4M2UyMjIzYThiMDBlMWZiMGEyMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.kO5DWYSmhfdU4rh4LqsVpvYeEbism1JjuZzZ4u6_e9o'
        }
    };

    const [tvDetails, setTVDetails] = useState([]);
    const [tvCast, setTVCast] = useState([]);
    const [tvVideos, setTVVideos] = useState([]);
    const [creator, setCreator] = useState([]);
    const [watchTVProviders, setWatchTVProviders] = useState([]);

    //Fetch movie details of the current movie
    useEffect(()=> {
        async function fetchTVData() {
            let response = await fetch(`https://api.themoviedb.org/3/tv/${series.id}?append_to_response=videos%2Ccredits&language=en-US`, options)
            response = await response.json();
            setTVDetails(response);
            setCreator(response.created_by);
            setTVCast(response.credits.cast);
            setTVVideos(response.videos.results[0]);
        }

        async function fetchTVWatchData() {
            let watchResponse = await fetch(`https://api.themoviedb.org/3/tv/${series.id}/watch/providers`, options)
            watchResponse = await watchResponse.json()
            setWatchTVProviders(watchResponse.results.US);
            console.log(watchResponse.results.US);
        }

        fetchTVData()
        fetchTVWatchData()
    }, []);
    

    return (
    <>
    <div className="relative">
        <div className="relative h-96 overflow-hidden rounded">
            <img className="absolute w-full" src={`https://image.tmdb.org/t/p/original/${series.backdrop_path}`}></img>
            <div className="absolute h-full w-full bg-gradient-to-b from-transparent from-1% to-neutral-900 "></div>
        </div>
        <div className="grid grid-cols-3 mx-10 absolute top-40">
            <div className="col-span-1 flex flex-col flex-wrap content-center px-8">
                <img className="h-fit w-fit rounded max-h-96" src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}></img>
                <button className="text-white bg-peach rounded py-2 mt-6">Add To Watchlist</button>
            </div>
            <div className="col-span-2 mt-20 mb-10">
                <h1 className="text-white text-5xl font-bold">{tvDetails.name}</h1>
                <p className="text-white">{`${series.first_air_date.slice(0,4)} · ${tvDetails.number_of_seasons} Seasons`}</p>
                <h3 className="text-white font-bold mt-6">Synopsis</h3>
                <p className="text-white">{series.overview}</p>
                <h3 className="text-white font-bold mt-6">Where To Watch</h3>
                <p className="text-white">Put streaming logos here.</p>
                <h3 className="text-white font-bold mt-6">Trailer</h3>

                <div className="relative h-max w-max mt-1">
                    <a href={`https://www.youtube.com/watch?v=${tvVideos.key}`} target="_blank">
                        <img className="w-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={playBtn}></img>
                        <img className="w-80 block rounded"src={`http://img.youtube.com/vi/${tvVideos.key}/0.jpg`}></img>
                    </a>
                </div>
                
                <h3 className="text-white font-bold mt-6">Created By</h3>
                <ul>
                    {creator.map((person) => {
                        return (
                            <p key={person.credit_id} className="text-white">{person.name}</p>
                        )
                    })}
                </ul>
                   
        
                
                <h3 className="text-white font-bold mt-6">Starring</h3>
                <ul>
                    {tvCast.slice(0, 10).map((actor) => {
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

export default SeriesDetails