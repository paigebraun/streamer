import { useState, useEffect } from "react";
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from "react-icons/bs";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// Import featured banners
import manchester from "../assets/Manchester.png";
import paloAlto from "../assets/PaloAlto.png";
import pines from "../assets/Pines.png";
import freakyFriday from "../assets/FreakyFriday.png";

function Featured() {
    const [slide, setSlide] = useState(0);
    const [autoSlide, setAutoSlide] = useState(0);

    // Define featured items
    const featured_1 = {
        src: manchester,
        backdrop_path: "/wj2nLa0vfS0SLu2vJ6ABTRhMrok.jpg",
        id: 334541,
        overview:
            "After his older brother passes away, Lee Chandler is forced to return home to care for his 16-year-old nephew. There he is compelled to deal with a tragic past that separated him from his family and the community where he was born and raised.",
        poster_path: "/e8daDzP0vFOnGyKmve95Yv0D0io.jpg",
        release_date: "2016-11-18",
        runtime: 138,
        title: "Manchester by the Sea",
        link: "/manchester-by-the-sea",
        color: "bg-sea",
    };

    const featured_2 = {
        src: paloAlto,
        backdrop_path: "/1FuYF7BLs6a4LPGve7OjWEriMfP.jpg",
        id: 192132,
        overview:
            "Shy, sensitive April is the class virgin, torn between an illicit flirtation with her soccer coach Mr. B and an unrequited crush on sweet stoner Teddy. Emily, meanwhile, offers sexual favors to every boy to cross her path — including both Teddy and his best friend Fred, a live wire without filters or boundaries. As one high school party bleeds into the next — and April and Teddy struggle to admit their mutual affection — Fred's escalating recklessness starts to spiral into chaos.",
        poster_path: "/yjcwwYP3eSigxLKKVBoVVz85ZWv.jpg",
        release_date: "2013-12-29",
        runtime: 100,
        title: "Palo Alto",
        link: "/palo-alto",
        color: "bg-palo",
    };

    const featured_3 = {
        src: pines,
        backdrop_path: "/qnYwh0tGs0wvjkf7pGPr3TmVFh6.jpg",
        id: 97367,
        overview:
            "A motorcycle stunt rider considers committing a crime in order to provide for his wife and child, an act that puts him on a collision course with a cop-turned-politician.",
        poster_path: "/vY5j2xQzMGWmxBuhQo0HfA4Lxqb.jpg",
        release_date: "2013-03-14",
        runtime: 140,
        title: "The Place Beyond the Pines",
        link: "/the-place-beyond-the-pines",
        color: "bg-pine",
    };

    const featured_4 = {
        src: freakyFriday,
        backdrop_path: "/gOlMx8kFIIUmYVRIKuLbaLhBJSZ.jpg",
        id: 10330,
        overview:
            "Mother and daughter bicker over everything -- what Anna wears, whom she likes and what she wants to do when she's older. In turn, Anna detests Tess's fiancé. When a magical fortune cookie switches their personalities, they each get a peek at how the other person feels, thinks and lives.",
        poster_path: "/ipKcZ4Up7dp18XpsfYUc9NKZy3g.jpg",
        release_date: "2003-08-05",
        runtime: 97,
        title: "Freaky Friday",
        link: "/freaky-friday",
        color: "bg-stone-100",
    };

    const featuredItems = [featured_1, featured_2, featured_3, featured_4];

    // Handle slide advancements
    const nextSlide = () => {
        setSlide((prevSlide) =>
            prevSlide === featuredItems.length - 1 ? 0 : prevSlide + 1
        );
    };

    const prevSlide = () => {
        setSlide((prevSlide) =>
            prevSlide === 0 ? featuredItems.length - 1 : prevSlide - 1
        );
    };

    // Handle automatic slide transition
    const autoTransition = () => {
        setAutoSlide((prevAutoSlide) =>
            prevAutoSlide === featuredItems.length - 1 ? 0 : prevAutoSlide + 1
        );
    };

    useEffect(() => {
        const intervalId = setInterval(autoTransition, 7000);

        return () => clearInterval(intervalId);
    }, []);

    // Update the main slide when autoSlide changes
    useEffect(() => {
        setSlide(autoSlide);
    }, [autoSlide]);

    return (
        <div className="relative flex items-center flex-col">
            <div className="w-full h-48 flex overflow-hidden relative rounded-lg items-center sm:h-64">
                {/* Carousel Items */}
                {featuredItems.map((item, index) => (
                    <button
                        key={index}
                        className={`h-full w-full absolute block transition-opacity ${
                            slide === index ? "z-10" : "opacity-0"
                        } ${item.color}`}>
                        <Link to={item.link} state={item}>
                            <img
                                src={item.src}
                                className="absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 max-w-[150%] md:max-w-full lg:h-full"
                                alt={item.title}
                            />
                        </Link>
                    </button>
                ))}
                {/* Indicators */}
                <div className="flex absolute bottom-0 left-1/2 transform -translate-x-1/2 mb-2 z-20">
                    {featuredItems.map((_, index) => (
                        <motion.button
                            key={index}
                            whileHover={{ scale: 1.08 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => setSlide(index)}
                            className={`w-4 h-4 mx-2 rounded-full cursor-pointer filter drop-shadow-md ${
                                slide === index
                                    ? "bg-peach border-solid border-2 border-white"
                                    : "bg-gray-300"
                            }`}></motion.button>
                    ))}
                </div>
            </div>
            <motion.button
                whileHover={{ scale: 1.08, y: "-50%" }}
                initial={{ y: "-50%" }}
                whileTap={{ scale: 0.9 }}
                className="absolute left-0 top-1/2 z-20">
                <BsArrowLeftCircleFill
                    onClick={prevSlide}
                    className="text-white text-3xl w-14 filter drop-shadow-md cursor-pointer"
                />
            </motion.button>
            <motion.button
                whileHover={{ scale: 1.08, y: "-50%" }}
                initial={{ y: "-50%" }}
                whileTap={{ scale: 0.9 }}
                className="absolute right-0 top-1/2 z-20">
                <BsArrowRightCircleFill
                    onClick={nextSlide}
                    className="text-white text-3xl w-14 filter drop-shadow-md cursor-pointer"
                />
            </motion.button>
            <div className="bg-peach text-white p-2 px-4 z-10 absolute top-5 left-5 rounded-lg cursor-default">
                <p>Featured</p>
            </div>
        </div>
    );
}

export default Featured;
