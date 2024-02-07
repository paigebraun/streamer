import { useNavigate, Link } from "react-router-dom";
import { useEffect } from "react";
import { useUser } from './UserContext';

function Watchlist() {
    const navigate = useNavigate();
    const { loggedIn, updateUser, watchlist } = useUser();
    function routeChange() {
        let path = '/login';
        navigate(path);
    }

    const getWatchlist = async () => {
        try {
            const response = await fetch('http://localhost:3000/user/watchlist', {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log('Watchlist:', data);

                // Update the user context with the watchlist data
                updateUser({
                    loggedIn: true,
                    username: data.username, 
                    watchlist: data.watchlist,
                });
            } else {
                console.error('Failed to fetch watchlist');
            }
        } catch (error) {
            console.error('Error fetching watchlist:', error);
        }
    };

    useEffect(() => {
        // Fetch the watchlist data from the server
        if (loggedIn) {
            getWatchlist();
        }
    }, [loggedIn]);

    return (
        <>
            <h1 className="my-5 text-white text-4xl font-bold">Watchlist</h1>
            <div className="flex item-center justify-center">
                {loggedIn ? (
                    watchlist.length !== 0 ? (
                        <div className="flex overflow-x-auto">
                            <div className="flex flex-nowrap items-start">
                                {watchlist.map((movie) => {
                                    return (
                                        <Link to={`/${movie.title.replace(/[&:']/g, '').replace(/-/g, '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`} state={movie} key={movie.movieId}>
                                            <button className="relative max-w-[150px] w-max mr-5 text-left">
                                                <img className="h-56 rounded" src={`https://image.tmdb.org/t/p/original/${movie.posterPath}`} alt={movie.title} />
                                                <p className="text-white mt-1 max-h-12 overflow-hidden">{movie.title}</p>
                                            </button>
                                        </Link>
                                    )
                                })}
                            </div>
                        </div>
                    ) : (
                        <p className="text-white font-bold text-2xl mt-10 mb-32">Add movies to your watchlist and they will show up here.</p>
                    )
                ) : (
                    <p className="text-white font-bold text-2xl mt-10 mb-32"><button onClick={routeChange} className="text-peach hover:underline">Sign in</button> to see your watchlist</p>
                )}
            </div>
        </>
    )
}

export default Watchlist;
