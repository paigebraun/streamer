import { useNavigate } from "react-router-dom";

//import assets
import Logo from '../assets/StreamerLogo.svg'

//import child components
import SearchBar from './SearchBar'
import { useUser } from './UserContext';

function Header() {
    let navigate = useNavigate(); 
    function routeChange() {
        let path = '/login'; 
        navigate(path);
    }

    const { loggedIn, username, updateUser } = useUser();

    const logout = async (event) => {
        event.preventDefault();
    
        try {
            const response = await fetch('http://localhost:3000/user/logout', {
                method: 'POST',
                credentials: 'include',
            });

            if (response.status === 200) {
                const data = await response.json();
                console.log(data);

                updateUser({
                    loggedIn: false,
                    username: null,
                });
            } else {
                console.log('Logout failed');
            }
        } catch (error) {
            console.log('Logout error:', error);
        }
    };

    return(
        <div className="my-5 flex flex-row justify-between flex-wrap items-center content-center">
            <a href="/" className="flex"><img src={Logo} className="w-40 px-4"></img></a>
            <SearchBar />
            {loggedIn ? (
                <>
                <div className='flex relative items-center px-4 min-w-36'>
                    <svg className="h-6 w-6 text-white z-20 pointer-events-none" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                    </svg>
                    <p className="text-white text-lg px-2 z-20 pointer-events-none">{username}</p>

                    <div className="opacity-0 hover:opacity-100 pt-12 px-4 absolute w-full min-w-36 z-10 -top-2 right-0 flex flex-col p-2 items-center bg-zinc-800 rounded">
                        <button className="px-8 w-full py-2 m-2 text-xl rounded-lg text-white bg-peach hover:bg-peach-dark" onClick={logout}>Logout</button>
                    </div>
                </div>
                </>
            ) : (
                <button onClick={routeChange} className="text-white px-4 hover:underline">Sign In</button>
            )}
        </div>
    )
}

export default Header;
