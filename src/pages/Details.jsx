import { useLocation } from "react-router-dom"
import { useEffect } from "react";

//import components
import SeriesDetails from "../components/SeriesDetails";
import MovieDetails from "../components/MovieDetails";

function Details() {
    useEffect(() => {
        window.scrollTo(0, 0)
      }, [])
    //Get movie or TV show from state of popular list
    const location = useLocation();
    if (location.state.hasOwnProperty('name')) {
        //It's a TV show
        return (
            <SeriesDetails />
        )
    } else {
        //It's a movie
        return (
            <MovieDetails />
        )
    }
}

export default Details