import { useNavigate, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useUser } from './UserContext';
import { FaChevronDown } from "react-icons/fa6";

function Watchlist( {currentPage }) {
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

    const [open, setOpen] = useState(false);
    const [selected, setSelected] = useState('Recent');

    const sortedWatchlist = [...watchlist];

    if (selected === 'Alphabetical') {
        sortedWatchlist.sort((a, b) => {
        const titleA = a.title || a.name;
        const titleB = b.title || b.name;
        return titleA.localeCompare(titleB);
        });
    } else if (selected === 'Recent') {
        // No sorting needed, use the original order
    }

    return (
        <>
            <h1 className="my-5 text-white text-3xl font-bold">Watchlist</h1>
            {currentPage === 'userProfile' && (
                <div className="flex items-center gap-2 mb-4">
                    <p className="text-white">Sort By:</p>
                    <div className="relative">
                    <div onClick={() => setOpen(!open)} className="cursor-pointer bg-zinc-800 p-2 text-white flex items-center justify-between rounded min-w-40 relative">
                        {selected}
                        <FaChevronDown className={`${open && "rotate-180"} text-white ml-2`} />
                    </div>
                    <ul className={`bg-zinc-800 mt-2 overflow-y-auto cursor-pointer ${open ? "max-h-60" : "max-h-0"} absolute z-10 rounded w-full`}>
                        <li className="hover:bg-peach text-white rounded p-2" onClick={() => { setSelected('Alphabetical'); setOpen(false); }}>Alphabetical</li>
                        <li className="hover:bg-peach text-white rounded p-2" onClick={() => { setSelected('Recent'); setOpen(false); }}>Recent</li>
                    </ul>
                    </div>
                </div>
            )}
            <div className={`flex items-center ${sortedWatchlist.length !== 0 ? 'justify-start' : 'justify-center'} pb-8`}>
            {loggedIn ? (
            sortedWatchlist.length !== 0 ? (
                <div className="flex overflow-x-auto">
                <div className={`flex ${currentPage === 'userProfile' ? 'flex-wrap' : 'flex-nowrap'} items-start gap-4`}>
                    {sortedWatchlist.map((item) => (
                    <Link
                        to={`/${item.title ? item.title.replace(/[&:']/g, '').replace(/-/g, '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase() : item.name.replace(/[&:']/g, '').replace(/-/g, '').replace(/[^a-zA-Z0-9]/g, '-').toLowerCase()}`}
                        state={item}
                        key={item.id}
                    >
                        <button className="relative max-w-[150px] w-max text-left">
                        <div className="relative h-56 rounded overflow-hidden">
                            <img className="h-56 rounded hover:scale-110 transition duration-150 ease-out hover:ease-in" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`} alt={item.title || item.name} />
                        </div>
                        <p className="text-white mt-1 max-h-12 overflow-hidden">{item.title || item.name}</p>
                        </button>
                    </Link>
                    ))}
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