import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";

import Header from "../components/Header";

function Results() {
    const { id } = useParams();
    const [searchResults, setSearchResults] = useState([]);
    const [active, setActive] = useState("Movies");

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    useEffect(() => {
        const fetchSearchData = async () => {
            try {
                const response = await fetch(
                    `https://streamer-backend-wi3f.onrender.com/search?query=${id}`,
                    {
                        method: "GET",
                        credentials: "include",
                    }
                );
                const data = await response.json();
                setSearchResults(data);
            } catch (error) {
                console.error("Error fetching search results:", error);
            }
        };

        fetchSearchData();
    }, [id]);

    return (
        <>
            <Header />
            <button
                className={`rounded px-4 py-1 mr-2 ${
                    active === "Movies"
                        ? "bg-peach text-white"
                        : "bg-gray-200 text-gray-400"
                }`}
                onClick={() => setActive("Movies")}>
                Movies
            </button>
            <button
                className={`rounded px-4 py-1 mr-2 ${
                    active === "TV"
                        ? "bg-peach text-white"
                        : "bg-gray-200 text-gray-400"
                }`}
                onClick={() => setActive("TV")}>
                TV
            </button>
            {active === "TV" ? (
                <div className="flex flex-col gap-4 pb-6 mt-8">
                    {searchResults.map((result) => {
                        return result.poster_path !== null &&
                            result.overview != "" &&
                            result.hasOwnProperty("name") ? (
                            <Link
                                to={`/${result.name
                                    .replace(/[&:']/g, "")
                                    .replace(/-/g, "")
                                    .replace(/[^a-zA-Z0-9]/g, "-")
                                    .toLowerCase()}`}
                                state={result}
                                key={result.id}>
                                <button className="flex bg-zinc-800 p-2 md:p-4 gap-6 rounded text-left items-center w-full hover:bg-zinc-600">
                                    <img
                                        className="h-fit w-fit rounded max-h-40 md:max-h-48"
                                        src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}></img>
                                    <div className="flex flex-col">
                                        <h1 className="text-white text-xl md:text-3xl font-bold">
                                            {result.name}
                                        </h1>
                                        {result.release_date != undefined && (
                                            <p className="text-white">{`${result.release_date.slice(
                                                0,
                                                4
                                            )}`}</p>
                                        )}
                                        <p className="text-white mt-6 line-clamp-2">
                                            {result.overview}
                                        </p>
                                    </div>
                                </button>
                            </Link>
                        ) : null;
                    })}
                </div>
            ) : (
                <div className="flex flex-col gap-4 pb-6 mt-8">
                    {searchResults.map((result) => {
                        return result.poster_path !== null &&
                            result.overview != "" &&
                            result.hasOwnProperty("title") ? (
                            <Link
                                to={`/${result.title
                                    .replace(/[&:']/g, "")
                                    .replace(/-/g, "")
                                    .replace(/[^a-zA-Z0-9]/g, "-")
                                    .toLowerCase()}`}
                                state={result}
                                key={result.id}>
                                <button className="flex bg-zinc-800 p-2 md:p-4 gap-6 rounded text-left items-center w-full hover:bg-zinc-600">
                                    <img
                                        className="h-fit w-fit rounded max-h-40 md:max-h-48"
                                        src={`https://image.tmdb.org/t/p/original/${result.poster_path}`}></img>
                                    <div className="flex flex-col">
                                        <h1 className="text-white text-xl md:text-3xl font-bold">
                                            {result.title}
                                        </h1>
                                        {result.release_date != undefined && (
                                            <p className="text-white">{`${result.release_date.slice(
                                                0,
                                                4
                                            )}`}</p>
                                        )}
                                        <p className="text-white mt-6 line-clamp-2">
                                            {result.overview}
                                        </p>
                                    </div>
                                </button>
                            </Link>
                        ) : null;
                    })}
                </div>
            )}
        </>
    );
}

export default Results;
