// Import components
import Header from "../components/Header";
import Watchlist from "../components/Watchlist";

function UserProfile() {
    const currentPage = "userProfile";
    return (
        <>
            <Header />
            <Watchlist currentPage={currentPage} />
        </>
    );
}

export default UserProfile;
