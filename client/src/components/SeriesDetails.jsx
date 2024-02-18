import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import playBtn from "../assets/play.svg"
import { useUser } from './UserContext';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { motion } from 'framer-motion';

function SeriesDetails() {

    const location = useLocation();
    const series = location.state;
    const { updateUser, username, watchlist, loggedIn } = useUser();
    
    let watchProviders = [];

    // Check if the series is in the watchlist
    const isInWatchlist = watchlist.some((item) => item.id === series.id);

    // Conditional styling based on whether the series is in the watchlist
    const buttonColor = isInWatchlist ? 'bg-zinc-600 hover:bg-zinc-700' : 'bg-peach hover:bg-peach-dark';

    // Toggle watchlist button
    const watchlistButtonText = isInWatchlist ? "Remove from Watchlist" : "Add to Watchlist";

    // Add or remove series from watchlist based on the current state
    const handleWatchlistToggle = () => {
        if (isInWatchlist) {
            removeFromWatchlist(series);
        } else {
            addToWatchlist(series);
        }
    };
    
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
    const [watchHere, setWatchHere] = useState([]);

    //Fetch show details of the current show
    useEffect(()=> {
        async function fetchTVData() {
            let response = await fetch(`https://api.themoviedb.org/3/tv/${series.id}?append_to_response=videos%2Ccredits&language=en-US`, options)
            response = await response.json();
            setTVDetails(response);
            setCreator(response.created_by);
            setTVCast(response.credits.cast);
            setTVVideos(response.videos.results[0]);
            //console.log(response.videos.results)
        }

        async function fetchTVWatchData() {
            let watchResponse = await fetch(`https://api.themoviedb.org/3/tv/${series.id}/watch/providers`, options)
            watchResponse = await watchResponse.json()
            let ads = watchResponse.results.US.ads;
            let flatrate = watchResponse.results.US.flatrate;
            let buy = watchResponse.results.US.buy;
            let rent = watchResponse.results.US.rent;
            let free = watchResponse.results.US.free;

            if (ads != undefined) {
                ads.map((ads) => watchProviders.push(ads));
            }
            if (flatrate != undefined) {
                flatrate.map((flatrate) => watchProviders.push(flatrate));
            }
            if (buy != undefined) {
                buy.map((buy) => watchProviders.push(buy));
            }
            if (rent != undefined) {
                rent.map((rent) => watchProviders.push(rent));
            }
            if (free != undefined) {
                free.map((free) => watchProviders.push(free));
            }
            
            let filtered = watchProviders.filter((v,i,a)=>a.findIndex(v2=>(v2.provider_id===v.provider_id))===i)

            setWatchHere(filtered);
        }

        fetchTVData()
        fetchTVWatchData()

    }, []);

    //Add series to user's watchlist
    const addToWatchlist = useCallback(async (series) => {

        console.log('series details user:', username);
    
        try {
            const response = await fetch('http://localhost:3000/user/watchlist/add', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    username,
                    series,
                }),
            });
    
            const data = await response.json();
    
            if (response.ok) {
                console.log('adding to watchlist', data);
                updateUser({ loggedIn: true, username: username, watchlist: data.watchlist }); // Update user data in your app state after watchlist change
                
                // Display success toast
                toast.success('Successfully added to your watchlist!');
            
            } else {
                console.error(data.error);
            }
        } catch (error) {
            console.error('Add to watchlist error:', error);
        }
    }, [updateUser, username]);

    // Remove series from watchlist
    const removeFromWatchlist = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/watchlist/remove', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username: username,
                    seriesId: series.id,
                }),
            });

            const data = await response.json();
            console.log(data); // Log response from the server

            // Update user info with new watchlist
            updateUser({ loggedIn: true, username: username, watchlist: data.watchlist });
        } catch (error) {
            // Handle error
            console.error('Error removing from watchlist:', error)
        }
    };
    

    return (
    <>
        <ToastContainer theme="colored" position="bottom-right" />
        <div className="relative">
            <div className="relative h-96 overflow-hidden rounded">
                <img className="absolute w-full" src={`https://image.tmdb.org/t/p/original/${series.backdrop_path}`}></img>
                <div className="absolute h-full w-full bg-gradient-to-b from-transparent from-1% to-neutral-900 "></div>
            </div>
            <div className="grid grid-cols-3 mx-10 absolute top-40">
                <div className="col-span-1 flex flex-col flex-wrap content-center px-8">
                    <img className="h-fit w-fit rounded max-h-96" src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}></img>
                    {loggedIn && (
                    <motion.button 
                        whileHover={{ scale: 1.08 }}
                        whileTap={{ scale: 0.8 }}
                        className={`text-white rounded py-2 mt-6 ${buttonColor}`} 
                        onClick={handleWatchlistToggle}>{watchlistButtonText}
                    </motion.button>
                    )}
                </div>
                <div className="col-span-2 mt-20 mb-10">
                    <h1 className="text-white text-5xl font-bold">{tvDetails.name}</h1>
                    <p className="text-white">{`${series.first_air_date.slice(0,4)} · ${tvDetails.number_of_seasons} Seasons`}</p>
                    <h3 className="text-white font-bold mt-6">Synopsis</h3>
                    <p className="text-white">{series.overview}</p>
                    <h3 className="text-white font-bold mt-6">Where To Watch</h3>
                    {watchHere.length != 0 ? (
                    <div className="flex flex-wrap gap-4">
                        {watchHere.map((watch) => {
                            return (<img key={watch.provider_id} className="rounded h-16" src={`https://image.tmdb.org/t/p/original/${watch.logo_path}`}></img>)
                        })}
                    </div>
                    ) : <p className="text-white">Currently this title is not available to stream.</p>
                    }
                    { tvVideos != null ? (
                        <>
                        <h3 className="text-white font-bold mt-6">Trailer</h3>

                        <div className="relative h-max w-max mt-1">
                            <a href={`https://www.youtube.com/watch?v=${tvVideos.key}`} target="_blank">
                                <img className="w-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" src={playBtn}></img>
                                <img className="w-80 block rounded"src={`http://img.youtube.com/vi/${tvVideos.key}/0.jpg`}></img>
                            </a>
                        </div>
                        </>
                        )   : null
                    }
                    
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