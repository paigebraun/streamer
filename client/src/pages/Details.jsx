import { useLocation } from "react-router-dom";
import { useEffect } from "react";

// Import components
import Header from "../components/Header";
import SeriesDetails from "../components/SeriesDetails";
import MovieDetails from "../components/MovieDetails";

function Details() {
    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    // Get movie or TV show from state of popular list
    const location = useLocation();
    if (location.state.hasOwnProperty("name")) {
        // It's a TV show
        return (
            <>
                <Header />
                <SeriesDetails />
            </>
        );
    } else {
        // It's a movie
        return (
            <>
                <Header />
                <MovieDetails />
            </>
        );
    }
}

export default Details;
