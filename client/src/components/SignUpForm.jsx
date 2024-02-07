//import assets
import Logo from '../assets/StreamerLogo.svg';

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useUser } from './UserContext';

function SignUpForm() {
    const { updateUser } = useUser();

    const [state, setState] = useState({
        username: '',
        password: '',
    });

    const navigate = useNavigate();

    function handleSubmit(e) {
        console.log('sign-up handleSubmit, username: ');
        console.log(state.username);
        e.preventDefault();

        // Request to server to add a new username/password
        fetch('http://localhost:3000/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: state.username,
                password: state.password,
            }),
            credentials: 'include',
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (!data.errmsg) {
                    console.log('successful signup');
                    updateUser({
                        loggedIn: true,
                        username: data.username,
                        watchlist: data.watchlist,
                    });
                    navigate('/'); // Redirect to the home page
                } else {
                    console.log('username already taken');
                }
            })
            .catch((error) => {
                console.log('signup error: ');
                console.log(error);
                console.log('Error details:', error.message);
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
            <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-40 mr-2" src={Logo} alt="logo"></img>
            </a>
            <div className="w-full bg-zinc-800 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                        Sign up for an account
                    </h1>
                    <form className="space-y-4 md:space-y-6" onSubmit={(e) => handleSubmit(e)}>
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Your name</label>
                            <input type="text" name="username" value={state.username || ''} id="username" onChange={(e) => handleChange(e)} className="bg-zinc-600 text-white sm:text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5" placeholder="username" required=""></input>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                            <input type="password" name="password" value={state.password || ''} id="password" placeholder="••••••••" autoComplete="on" onChange={(e) => handleChange(e)} className="bg-zinc-600 text-white sm:text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5" required=""></input>
                        </div>
                        <button type="submit" className="w-full text-white bg-peach hover:bg-peach-dark focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Create Account</button>
                        <p className="text-sm font-light text-zinc-500">
                            Already have an account? <a href="/login" className="font-medium text-zinc-400 hover:underline">Sign In</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpForm;
