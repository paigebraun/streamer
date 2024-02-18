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
            <div className={`flex items-center ${watchlist.length !==0 ? 'justify-start' : 'justify-center'} pb-8`}>
                {loggedIn ? (
                    watchlist.length !== 0 ? (
                        <div className="flex overflow-x-auto">
                            <div className="flex flex-nowrap items-start">
                                {watchlist.map((item) => {
                                    return (
                                        <Link
                                            to={`/${item.title ? item.title.replace(/[&:']/g, '').replace(/-/g, '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() : item.name.replace(/[&:']/g, '').replace(/-/g, '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
                                            state={item}
                                            key={item.id}
                                        >
                                            <button className="relative max-w-[150px] w-max mr-5 text-left">
                                                <div className="relative h-56 rounded overflow-hidden">
                                                    <img className="h-56 rounded hover:scale-110 transition duration-150 ease-out hover:ease-in" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}></img>
                                                </div>
                                                <p className="text-white mt-1 max-h-12 overflow-hidden">{item.title || item.name}</p>
                                            </button>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <p className="text-white font-bold text-2xl mt-10 mb-32">Add movies or series to your watchlist, and they will show up here.</p>
                    )
                ) : (
                    <p className="text-white font-bold text-2xl mt-10 mb-32">
                        <button onClick={routeChange} className="text-peach hover:underline">Sign in</button> to see your watchlist
                    </p>
                )}
            </div>
        </>
    );
}

export default Watchlist;

