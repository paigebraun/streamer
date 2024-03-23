import { useEffect, useState, useCallback } from "react";
import { useLocation } from "react-router-dom";
import playBtn from "../assets/play.svg";
import { useUser } from "./UserContext";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { motion } from "framer-motion";

function MovieDetails() {
    const location = useLocation();
    const movie = location.state;
    const { updateUser, username, watchlist, loggedIn } = useUser();

    // Convert minutes to hours and minutes
    function toHoursAndMinutes(totalMinutes) {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h${minutes > 0 ? ` ${minutes}m` : ""}`;
    }

    // Check if the movie is in the watchlist
    const isInWatchlist = watchlist.some((item) => item.id === movie.id);

    // Conditional styling based on whether the movie is in the watchlist
    const buttonColor = isInWatchlist
        ? "bg-zinc-600 hover:bg-zinc-700"
        : "bg-peach hover:bg-peach-dark";

    const watchlistButtonText = isInWatchlist
        ? "Remove from Watchlist"
        : "Add to Watchlist";

    const handleWatchlistToggle = () => {
        if (isInWatchlist) {
            removeFromWatchlist(movie);
        } else {
            addToWatchlist(movie);
        }
    };

    const [movieDetails, setMovieDetails] = useState([]);
    const [cast, setCast] = useState([]);
    const [crew, setCrew] = useState([]);
    const [videos, setVideos] = useState([]);
    const [watchMovie, setWatchMovie] = useState([]);
    const [releaseDate, setReleaseDate] = useState("");

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

    // Fetch movie details of the current movie
    useEffect(() => {
        async function fetchData() {
            try {
                const response = await fetch(
                    `http://localhost:3000/movie/${movie.id}`
                );
                // Set movie details
                const data = await response.json();
                setMovieDetails(data.movieDetails);
                setCast(data.movieDetails.credits.cast);
                setCrew(data.movieDetails.credits.crew);
                setVideos(
                    data.movieDetails.videos.results.find(
                        (item) => item.type === "Trailer"
                    )
                );
                setReleaseDate(data.movieDetails.release_date);
                // Set where to watch details
                const watchProviders = processWatchProviders(data.watchDetails);
                setWatchMovie(watchProviders);
            } catch (error) {
                console.error("Error:", error);
            }
        }

        fetchData();
    }, []);

    // Add movie to user's watchlist
    const addToWatchlist = useCallback(
        async (movie) => {
            console.log("movie details user:", username);

            try {
                const response = await fetch(
                    "http://localhost:3000/user/watchlist/add",
                    {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                        },
                        credentials: "include",
                        body: JSON.stringify({
                            username,
                            movie,
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

    // Remove a movie from watchlist
    const removeFromWatchlist = async () => {
        try {
            const response = await fetch(
                "http://localhost:3000/user/watchlist/remove",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        username: username,
                        movieId: movie.id,
                    }),
                }
            );

            const data = await response.json();
            console.log(data);

            // Update user info with new watchlist
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
                        src={`https://image.tmdb.org/t/p/original/${movie.backdrop_path}`}></img>
                    <div className="absolute h-full w-full bg-gradient-to-b from-transparent from-1% to-neutral-900 "></div>
                </div>
                <div className="flex absolute top-24 w-fit sm:top-40 md:grid md:grid-cols-3 max-w-[1200px]">
                    <div className="hidden flex-col flex-wrap content-center px-8 md:flex items-center md:col-span-1">
                        <img
                            className="rounded max-h-96"
                            src={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}></img>
                        {loggedIn && (
                            <motion.button
                                whileHover={{ scale: 1.08 }}
                                whileTap={{ scale: 0.9 }}
                                className={`text-white rounded py-2 mt-6 ${buttonColor} w-full md:max-w-64`}
                                onClick={handleWatchlistToggle}>
                                {watchlistButtonText}
                            </motion.button>
                        )}
                    </div>
                    <div className="col-span-2 mt-20 mb-10 w-full">
                        <h1 className="text-white text-2xl font-bold text-center md:text-left sm:text-5xl">
                            {movie.title}
                        </h1>
                        <p className="text-white text-center md:text-left">{`${releaseDate.slice(
                            0,
                            4
                        )} · ${toHoursAndMinutes(movieDetails.runtime)}`}</p>
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
                        <p className="text-white">{movie.overview}</p>
                        <h3 className="text-white font-bold mt-6">
                            Where To Watch
                        </h3>
                        {watchMovie.length != 0 ? (
                            <div className="flex flex-wrap gap-4">
                                {watchMovie.map((watch) => {
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
                        {videos != null ? (
                            <>
                                <h3 className="text-white font-bold mt-6">
                                    Trailer
                                </h3>

                                <div className="relative h-max w-full min-[360px]:w-max mt-1">
                                    <a
                                        href={`https://www.youtube.com/watch?v=${videos.key}`}
                                        target="_blank">
                                        <img
                                            className="w-20 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                                            src={playBtn}></img>
                                        <img
                                            className="w-80 block rounded"
                                            src={`http://img.youtube.com/vi/${videos.key}/0.jpg`}></img>
                                    </a>
                                </div>
                            </>
                        ) : null}

                        <h3 className="text-white font-bold mt-6">Directors</h3>
                        <ul>
                            {crew.map((director) => {
                                return director.job == "Director" ? (
                                    <p
                                        className="text-white"
                                        key={director.credit_id}>
                                        {director.name}
                                    </p>
                                ) : null;
                            })}
                        </ul>
                        <h3 className="text-white font-bold mt-6">Starring</h3>
                        <ul>
                            {cast.slice(0, 10).map((actor) => {
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

export default MovieDetails;
