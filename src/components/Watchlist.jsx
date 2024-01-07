import { useNavigate } from "react-router-dom";

function Watchlist() {
    let navigate = useNavigate(); 
    function routeChange() {
        let path = '/login'; 
        navigate(path);
    }

    return (
        <>
            <h1 className="my-5 text-white text-4xl font-bold">Watchlist</h1>
            <div className="flex item-center justify-center">
                <p className="text-white font-bold text-2xl mt-10 mb-32"><button onClick={routeChange} className="text-peach hover:underline">Sign in</button> to see your watchlist</p>
            </div>
        </>
    )
}

export default Watchlist