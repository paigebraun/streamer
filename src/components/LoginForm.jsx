//import assets
import Logo from '../assets/StreamerLogo.svg'

function LoginForm() {
    return(      
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
            <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                <img className="w-40 mr-2" src={Logo} alt="logo"></img>
            </a>
            <div className="w-full bg-zinc-800 rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
                        Sign in to your account
                    </h1>
                    <form className="space-y-4 md:space-y-6" action="#">
                        <div>
                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-white">Your name</label>
                            <input type="text" name="username" id="username" className="bg-zinc-600 text-white sm:text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5" placeholder="username" required=""></input>
                        </div>
                        <div>
                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-white">Password</label>
                            <input type="password" name="password" id="password" placeholder="••••••••" autoComplete="on" className="bg-zinc-600 text-white sm:text-sm rounded-lg focus:ring-peach focus:border-peach block w-full p-2.5" required=""></input>
                        </div>
                        <button type="submit" className="w-full text-white bg-peach hover:bg-peach-dark focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center">Sign In</button>
                        <p className="text-sm font-light text-zinc-500">
                            Don't have an account yet? <a href="/signup" className="font-medium text-zinc-400 hover:underline">Sign Up</a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default LoginForm