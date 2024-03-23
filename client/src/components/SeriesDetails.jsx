import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import playBtn from "../assets/play.svg";
import { useUser } from "./UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

function SeriesDetails() {
    const location = useLocation();
    const series = location.state;
    const { updateUser, username, watchlist, loggedIn } = useUser();

    // Check if the series is in the watchlist
    const isInWatchlist = watchlist.some((item) => item.id === series.id);

    // Conditional styling based on whether the series is in the watchlist
    const buttonColor = isInWatchlist
        ? "bg-zinc-600 hover:bg-zinc-700"
        : "bg-peach hover:bg-peach-dark";

    const watchlistButtonText = isInWatchlist
        ? "Remove from Watchlist"
        : "Add to Watchlist";

    const handleWatchlistToggle = () => {
        if (isInWatchlist) {
            removeFromWatchlist(series);
        } else {
            addToWatchlist(series);
        }
    };

    const [tvDetails, setTVDetails] = useState([]);
    const [tvCast, setTVCast] = useState([]);
    const [tvVideos, setTVVideos] = useState([]);
    const [creator, setCreator] = useState([]);
    const [watchHere, setWatchHere] = useState([]);

    function processWatchProviders(watchResponse) {
        let watchProviders = [];

        const { ads, flatrate, buy, rent, free } = watchResponse.results.US;

        // Check and push each type of provider into watchProviders array
        if (ads) ads.forEach((provider) => watchProviders.push(provider));
        if (flatrate)
            flatrate.forEach((provider) => watchProviders.push(provider));
        if (buy) buy.forEach((provider) => watchProviders.push(provider));
        if (rent) rent.forEach((provider) => watchProviders.push(provider));
        if (free) free.forEach((provider) => watchProviders.push(provider));

        // Filter out duplicates based on provider_id
        const filtered = watchProviders.filter(
            (provider, index, array) =>
                index ===
                array.findIndex((p) => p.provider_id === provider.provider_id)
        );

        return filtered;
    }

    //Fetch show details of the current show
    useEffect(() => {
        async function fetchTVData() {
            try {
                const response = await fetch(
                    `https://streamer-backend-wi3f.onrender.com/series/${series.id}`
                );
                const data = await response.json();
                // Set TV show details
                setTVDetails(data.seriesDetails);
                setCreator(data.seriesDetails.created_by);
                setTVCast(data.seriesDetails.credits.cast);
                setTVVideos(data.seriesDetails.videos.results[0]);
                // Set where to watch details
                const watchProviders = processWatchProviders(data.watchDetails);
                setWatchHere(watchProviders);
            } catch (error) {
                console.error("Error:", error);
            }
        }

        fetchTVData();
    }, []);

    //Add series to user's watchlist
    const addToWatchlist = useCallback(
        async (series) => {
            console.log("series details user:", username);

            try {
                const response = await fetch(
                    "https://streamer-backend-wi3f.onrender.com/user/watchlist/add",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            username,
                            series,
                        }),
                    }
                );

                const data = await response.json();

                if (response.ok) {
                    console.log("adding to watchlist", data);
                    updateUser({
                        loggedIn: true,
                        username: username,
                        watchlist: data.watchlist,
                    });

                    // Display success toast
                    toast.success("Successfully added to your watchlist!");
                } else {
                    console.error(data.error);
                }
            } catch (error) {
                console.error("Add to watchlist error:", error);
            }
        },
        [updateUser, username]
    );

    // Remove series from watchlist
    const removeFromWatchlist = async () => {
        try {
            const response = await fetch(
                "https://streamer-backend-wi3f.onrender.com/user/watchlist/remove",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        seriesId: series.id,
                    }),
                }
            );

            const data = await response.json();

            updateUser({
                loggedIn: true,
                username: username,
                watchlist: data.watchlist,
            });
        } catch (error) {
            console.error("Error removing from watchlist:", error);
        }
    };

    return (
        <>
            <ToastContainer theme="colored" position="bottom-right" />
            <div className="relative flex flex-col items-center">
                <div className="relative h-52 md:h-96 overflow-hidden rounded flex justify-center w-full">
                    <img
                        className="absolute w-[150%] md:w-full"
                        src={`https://image.tmdb.org/t/p/original/${series.backdrop_path}`}></img>
                    <div className="absolute h-full w-full bg-gradient-to-b from-transparent from-1% to-neutral-900 "></div>
                </div>
                <div className="flex absolute top-24 w-fit sm:top-40 md:grid md:grid-cols-3 max-w-[1200px]">
                    <div className="hidden flex-col flex-wrap content-center px-8 md:flex items-center md:col-span-1">
                        <img
                            className="rounded max-h-96"
                            src={`https://image.tmdb.org/t/p/original/${series.poster_path}`}></img>
                        {loggedIn && (
                            <motion.button
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.8 }}
                                className={`text-white rounded py-2 mt-6 ${buttonColor} w-full md:max-w-64`}
                                onClick={handleWatchlistToggle}>
                                {watchlistButtonText}
                            </motion.button>
                        )}
                    </div>
                    <div className="col-span-2 mt-20 mb-10 w-full">
                        <h1 className="text-white text-2xl font-bold text-center md:text-left sm:text-5xl">
                            {tvDetails.name}
                        </h1>
                        <p className="text-white text-center md:text-left">{`${series.first_air_date.slice(
                            0,
                            4
                        )} · ${tvDetails.number_of_seasons} Seasons`}</p>
                        {loggedIn && (
                            <motion.button
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.9 }}
                                className={`text-white rounded py-2 mt-6 ${buttonColor} w-full md:hidden`}
                                onClick={handleWatchlistToggle}>
                                {watchlistButtonText}
                            </motion.button>
                        )}
                        <h3 className="text-white font-bold mt-6">Synopsis</h3>
                        <p className="text-white">{series.overview}</p>
                        <h3 className="text-white font-bold mt-6">
                            Where To Watch
                        </h3>
                        {watchHere.length != 0 ? (
                            <div className="flex flex-wrap gap-4">
                                {watchHere.map((watch) => {
                                    return (
                                        <img
                                            key={watch.provider_id}
                                            className="rounded h-16"
                                            src={`https://image.tmdb.org/t/p/original/${watch.logo_path}`}></img>
                                    );
                                })}
                            </div>
                        ) : (
                            <p className="text-white">
                                Currently this title is not available to stream.
                            </p>
                        )}
                        {tvVideos != null ? (
                            <>
                                <h3 className="text-white font-bold mt-6">
                                    Trailer
                                </h3>

                                <div className="relative h-max w-full min-[360px]:w-max mt-1">
                                    <a
                                        href={`https://www.youtube.com/watch?v=${tvVideos.key}`}
                                        target="_blank">
                                        <img
                                            className="w-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            src={playBtn}></img>
                                        <img
                                            className="w-80 block rounded"
                                            src={`http://img.youtube.com/vi/${tvVideos.key}/0.jpg`}></img>
                                    </a>
                                </div>
                            </>
                        ) : null}

                        <h3 className="text-white font-bold mt-6">
                            Created By
                        </h3>
                        <ul>
                            {creator.map((person) => {
                                return (
                                    <p
                                        key={person.credit_id}
                                        className="text-white">
                                        {person.name}
                                    </p>
                                );
                            })}
                        </ul>

                        <h3 className="text-white font-bold mt-6">Starring</h3>
                        <ul>
                            {tvCast.slice(0, 10).map((actor) => {
                                return (
                                    <p
                                        className="text-white"
                                        key={actor.credit_id}>
                                        {actor.name}
                                    </p>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}

export default SeriesDetails;
