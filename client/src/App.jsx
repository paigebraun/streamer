import { Route, Routes } from "react-router-dom";
import { useEffect } from "react";

import { useUser } from "./components/UserContext";

import Home from "./pages/Home";
import Details from "./pages/Details";
import Results from "./pages/Results";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import UserProfile from "./pages/UserProfile";

function App() {
    const { updateUser } = useUser();

    useEffect(() => {
        getUser();
    }, []);

    // Check to see if a user is already logged in
    const getUser = async () => {
        try {
            const response = await fetch(
                "https://streamer-backend-wi3f.onrender.com/user/",
                {
                    method: "GET",
                    credentials: "include",
                }
            );

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const data = await response.json();

            console.log("Get user response: ");
            console.log(data);

            if (data.user) {
                console.log(
                    "Get User: There is a user saved in the server session: "
                );
                updateUser({
                    loggedIn: true,
                    username: data.user.username,
                });
            } else {
                console.log("Get user: no user");
                updateUser({
                    loggedIn: false,
                    username: null,
                });
            }
        } catch (error) {
            console.log("Get user error: ", error);
        }
    };

    return (
        <>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<Details />} />
                <Route path="/search">
                    <Route index element={<Results />} />
                    <Route path=":id" element={<Results />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<SignUp />} />
                <Route path="/user/:id" element={<UserProfile />} />
            </Routes>
        </>
    );
}

export default App;
