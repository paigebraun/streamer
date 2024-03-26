import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./UserContext";
import { motion } from "framer-motion";

// Import assets
import Logo from "../assets/StreamerLogo.svg";

function LoginForm() {
    const { updateUser, username, password, watchlist } = useUser();
    const [state, setState] = useState({
        username: username,
        password: password,
        watchlist: watchlist,
    });
    const [error, setError] = useState(null);

    // Use useEffect to update the state when context values change
    useEffect(() => {
        setState({
            username: username,
            password: password,
            watchlist: watchlist,
        });
    }, [username, password, watchlist]);

    const navigate = useNavigate();

    function routeChange() {
        let path = "/signup";
        navigate(path);
    }

    function handleSubmit(e) {
        e.preventDefault();
        console.log("handleSubmit");
        console.log("Login request body:", state);

        // Request to server to login
        fetch("https://streamer-backend-wi3f.onrender.com/user/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            credentials: "include",
            body: JSON.stringify({
                username: state.username,
                password: state.password,
            }),
        })
            .then(async (response) => {
                console.log("login response: ", response);

                if (response.ok) {
                    setError(null);
                    return response.json();
                } else {
                    const data = await response.json();
                    console.log("data", data);
                    throw new Error(data.error || "Login failed");
                }
            })
            .then((data) => {
                updateUser({
                    loggedIn: true,
                    username: data.username,
                    watchlist: data.watchlist,
                });
                // Redirect to home once loggedIn
                navigate("/");
            })
            .catch((error) => {
                setError(error.message);
                console.log("login error: ", error);
            });
    }

    const handleChange = (e) => {
        setState({
            ...state,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a
                href="/"
                className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-40 mr-2" src={Logo} alt="logo"></img>
            </a>
            <div className="w-full bg-zinc-800 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                        Sign in to your account
                    </h1>
                    {/* Display error message */}
                    {error && <p className="text-peach mt-4">{error}</p>}
                    <form
                        className="space-y-4 md:space-y-6 mt-4"
                        onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label
                                htmlFor="username"
                                className="block mb-2 text-sm font-medium text-white">
                                Username
                            </label>
                            <input
                                type="text"
                                name="username"
                                value={state.username || ""}
                                id="username"
                                onChange={(e) => handleChange(e)}
                                className="bg-zinc-600 text-white sm:text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5"
                                placeholder="username"
                                required=""></input>
                        </div>
                        <div>
                            <label
                                htmlFor="password"
                                className="block mb-2 text-sm font-medium text-white">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={state.password || ""}
                                id="password"
                                onChange={(e) => handleChange(e)}
                                placeholder="••••••••"
                                autoComplete="on"
                                className="bg-zinc-600 text-white sm:text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5"
                                required=""></input>
                        </div>
                        <motion.button
                            whileHover={{ scale: 1.03 }}
                            whileTap={{ scale: 0.9 }}
                            type="submit"
                            className="w-full text-white bg-peach hover:bg-peach-dark focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                            Sign In
                        </motion.button>
                        <p className="text-sm font-light text-zinc-500">
                            Don't have an account yet?{" "}
                            <button
                                onClick={routeChange}
                                className="font-medium text-zinc-400 hover:underline">
                                Sign Up
                            </button>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default LoginForm;
