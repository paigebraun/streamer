// Import components
import Header from "../components/Header";
import Featured from "../components/Featured";
import Popular from "../components/Popular";
import Watchlist from "../components/Watchlist";

function Home() {
    const currentPage = "Home";
    return (
        <>
            <Header />
            <Featured />
            <Popular />
            <Watchlist currentPage={currentPage} />
        </>
    );
}

export default Home;
