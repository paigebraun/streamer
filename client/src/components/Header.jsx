import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { Cross as Hamburger } from "hamburger-react";

// Import assets
import Logo from "../assets/StreamerLogo.svg";
import SLogo from "../assets/SLogo.svg";

// Import child components and context
import SearchBar from "./SearchBar";
import { useUser } from "./UserContext";

function Header() {
    let navigate = useNavigate();
    function routeChange() {
        let path = "/login";
        navigate(path);
    }

    const { loggedIn, username, updateUser } = useUser();

    function toUserProfile() {
        let path = `/user/${username}`;
        navigate(path);
    }

    // Log a user out
    const logout = async (event) => {
        event.preventDefault();

        try {
            const response = await fetch(
                "https://streamer-backend-wi3f.onrender.com/user/logout",
                {
                    method: "POST",
                    credentials: "include",
                }
            );

            if (response.status === 200) {
                const data = await response.json();
                console.log(data);

                updateUser({
                    loggedIn: false,
                    username: null,
                });
                navigate("/"); // Redirect to the home page
            } else {
                console.log("Logout failed");
            }
        } catch (error) {
            console.log("Logout error:", error);
        }
    };

    const [isHovered, setHovered] = useState(false);
    const [isOpen, setOpen] = useState(false);

    const handleMouseEnter = () => {
        setHovered(true);
    };

    const handleMouseLeave = () => {
        setHovered(false);
    };

    return (
        <>
            <div className="mt-5 flex flex-row justify-between flex-wrap justify-between mb-2 md:mb-5 md:items-center content-center">
                <a href="/" className="flex hidden md:block">
                    <img src={Logo} className="w-40 px-4"></img>
                </a>
                <a href="/" className="flex block md:hidden">
                    <img src={SLogo} className="w-4/5 px-4"></img>
                </a>
                <SearchBar
                    customClassesForm="hidden w-1/2 md:block"
                    placeholderText="Look Up Movies & TV Shows"
                />
                {loggedIn ? (
                    <>
                        <div className="flex relative items-center px-4 min-w-36 hidden md:block">
                            <div
                                className={`relative flex w-full px-2 ${
                                    isHovered ? "opacity-100" : "opacity-100"
                                }`}
                                onMouseEnter={handleMouseEnter}
                                onMouseLeave={handleMouseLeave}>
                                <button
                                    onClick={toUserProfile}
                                    className="z-30 flex w-full cursor-pointer hover:bg-zinc-600 rounded-lg p-2">
                                    <svg
                                        className="h-6 w-6 text-white z-30"
                                        fill="currentColor"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor">
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth="1"
                                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                        />
                                    </svg>
                                    <p className="text-white text-lg px-2 z-30 relative">
                                        {username}
                                    </p>
                                </button>

                                <div
                                    className={`opacity-0 ${
                                        isHovered ? "opacity-100" : ""
                                    } pt-12 absolute w-full z-20 -top-2 right-0 flex flex-col p-2 items-center bg-zinc-800 rounded`}>
                                    <motion.button
                                        whileTap={{ scale: 0.9 }}
                                        className="w-full py-2 mt-3 text-lg rounded-lg text-white bg-peach hover:bg-peach-dark cursor-pointer"
                                        onClick={logout}>
                                        Logout
                                    </motion.button>
                                </div>
                            </div>
                        </div>
                        <div className="md:hidden">
                            <Hamburger
                                direction="left"
                                color="white"
                                toggled={isOpen}
                                toggle={setOpen}
                            />
                        </div>
                    </>
                ) : (
                    <button
                        onClick={routeChange}
                        className="text-white px-4 hover:underline">
                        Sign In
                    </button>
                )}
            </div>
            <div>
                {loggedIn && isOpen && (
                    <motion.div
                        initial={{ y: -20 }}
                        animate={{ y: 0 }}
                        className="flex flex-col relative items-center px-4 bg-zinc-800 py-4 rounded mb-4 md:block">
                        <button
                            onClick={toUserProfile}
                            className="z-30 flex justify-center w-full cursor-pointer rounded-lg p-2 bg-zinc-600">
                            <svg
                                className="h-6 w-6 text-white z-30"
                                fill="currentColor"
                                viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="1"
                                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                                />
                            </svg>
                            <p className="text-white text-lg px-2 z-30 relative">
                                {username}
                            </p>
                        </button>
                        <button
                            className="w-full py-2 mt-3 text-lg rounded-lg text-white bg-peach cursor-pointer"
                            onClick={logout}>
                            Logout
                        </button>
                    </motion.div>
                )}
                <SearchBar
                    customClassesForm="block w-full mb-5 md:hidden"
                    customClassesBtn="hidden"
                    placeholderText="Search"
                />
            </div>
        </>
    );
}

export default Header;
