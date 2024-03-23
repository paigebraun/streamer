import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { IoInformationCircle } from "react-icons/io5";

function SearchBar({ customClassesForm, customClassesBtn, placeholderText }) {
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState("");
    const [showEmptySearchError, setShowEmptySearchError] = useState(false);

    function handleSearch(event) {
        event.preventDefault();
        if (searchQuery === "") {
            setShowEmptySearchError(true);
            return;
        } else {
            setShowEmptySearchError(false);
            navigate("/search/" + event.target.search.value);
        }
    }

    return (
        <>
            <form className={customClassesForm} onSubmit={handleSearch}>
                <label
                    htmlFor="search"
                    className="mb-2 font-medium text-gray-900 sr-only">
                    Search
                </label>
                <div className="relative">
                    {showEmptySearchError && (
                        <div className="bg-peach flex items-center w-full rounded text-white absolute justify-center left-1/2 transform top-[55px] -translate-x-1/2 md:-translate-x-0 md:translate-y-0 md:left-1/4 md:w-fit z-20 py-2 px-4 text-md transition-opacity duration-500 ease-in-out opacity-100">
                            <IoInformationCircle className="w-6 h-6 mr-2" />
                            <div className="mr-3">
                                Search input cannot be empty.
                            </div>
                            <button
                                className="bg-peach-light text-white hover:bg-peach-dark hover:text-white py-1/2 px-2 font-bold rounded"
                                onClick={() => setShowEmptySearchError(false)}>
                                X
                            </button>
                        </div>
                    )}
                    <div className="absolute inset-y-0 left-0 flex items-center pl-5 pointer-events-none">
                        <svg
                            className="w-5 h-5 text-gray-900"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 20 20">
                            <path
                                stroke="currentColor"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                            />
                        </svg>
                    </div>
                    <input
                        type="search"
                        value={searchQuery}
                        id="search"
                        onChange={(e) => {
                            setSearchQuery(e.target.value);
                        }}
                        className="w-full block w-full py-2.5 pl-16 text-gray-800 border rounded-full bg-gray-50 focus:outline-none focus:ring-peach focus:border-peach"
                        placeholder={placeholderText}></input>
                    <motion.button
                        whileTap={{ scale: 0.9 }}
                        type="submit"
                        className={`${customClassesBtn} text-white absolute right-2.5 bottom-2 bg-peach hover:bg-peach-dark font-medium rounded-full px-6 py-1`}>
                        Search
                    </motion.button>
                </div>
            </form>
        </>
    );
}

export default SearchBar;
