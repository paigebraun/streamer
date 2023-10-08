//import assets
import Logo from '../assets/StreamerLogo.svg'

//import child components
import SearchBar from './SearchBar'

function Header() {
    return(
        <div className="my-5 flex flex-row justify-between flex-wrap content-center">
        <a href="/" className="flex"><img src={Logo} className="w-40 px-4"></img></a>
        <SearchBar />
        <button className="text-white px-4 hover:underline">Sign In</button>
        </div>
    )
}

export default Header