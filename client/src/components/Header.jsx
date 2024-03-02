import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { useState } from "react";

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

    function toUserProfile() {
        let path = `/user/${username}`
        navigate(path);
    }

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

    const [isHovered, setHovered] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return(
        <div className="my-5 flex flex-row justify-between flex-wrap items-center content-center">
            <a href="/" className="flex"><img src={Logo} className="w-40 px-4"></img></a>
            <SearchBar />
            {loggedIn ? (
                <>
                <div className='flex relative items-center px-4 min-w-36'>
                    <div className={`relative flex w-full px-2 ${isHovered ? 'opacity-100' : 'opacity-100'}`} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        <button onClick={toUserProfile} className='z-20 flex w-full cursor-pointer hover:bg-zinc-600 rounded-lg p-2'>
                        <svg className="h-6 w-6 text-white z-20" fill="currentColor" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
                        </svg>
                        <p className="text-white text-lg px-2 z-20 relative">{username}</p>
                        </button>

                        <div className={`opacity-0 ${isHovered ? 'opacity-100' : ''} pt-12 absolute w-full z-10 -top-2 right-0 flex flex-col p-2 items-center bg-zinc-800 rounded`}>
                        <motion.button whileTap={{ scale: 0.9 }} className="w-full py-2 mt-3 text-lg rounded-lg text-white bg-peach hover:bg-peach-dark cursor-pointer" onClick={logout}>
                            Logout
                        </motion.button>
                        </div>
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
