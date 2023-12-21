//import featured banners
import manchester from '../assets/Manchester.png';
import paloAlto from '../assets/PaloAlto.png';
import pines from '../assets/Pines.png';
import freakyFriday from '../assets/FreakyFriday.png';

import { Carousel } from 'flowbite-react';
import { Link } from 'react-router-dom';

function Featured() {

    const featured_1 = {
        "backdrop_path": "/wj2nLa0vfS0SLu2vJ6ABTRhMrok.jpg",
        "id": 334541,
        "overview": "After his older brother passes away, Lee Chandler is forced to return home to care for his 16-year-old nephew. There he is compelled to deal with a tragic past that separated him from his family and the community where he was born and raised.",
        "poster_path": "/e8daDzP0vFOnGyKmve95Yv0D0io.jpg",
        "release_date": "2016-11-18",
        "runtime": 138,
        "title": "Manchester by the Sea"
    };

    const featured_2 = {
        "backdrop_path": "/1FuYF7BLs6a4LPGve7OjWEriMfP.jpg",
        "id": 192132,
        "overview": "Shy, sensitive April is the class virgin, torn between an illicit flirtation with her soccer coach Mr. B and an unrequited crush on sweet stoner Teddy. Emily, meanwhile, offers sexual favors to every boy to cross her path — including both Teddy and his best friend Fred, a live wire without filters or boundaries. As one high school party bleeds into the next — and April and Teddy struggle to admit their mutual affection — Fred's escalating recklessness starts to spiral into chaos.",
        "poster_path": "/yjcwwYP3eSigxLKKVBoVVz85ZWv.jpg",
        "release_date": "2013-12-29",
        "runtime": 100,
        "title": "Palo Alto"
    }

    const featured_3 = {
        "backdrop_path": "/qnYwh0tGs0wvjkf7pGPr3TmVFh6.jpg",
        "id": 97367,
        "overview": "A motorcycle stunt rider considers committing a crime in order to provide for his wife and child, an act that puts him on a collision course with a cop-turned-politician.",
        "poster_path": "/vY5j2xQzMGWmxBuhQo0HfA4Lxqb.jpg",
        "release_date": "2013-03-14",
        "runtime": 140,
        "title": "The Place Beyond the Pines"
    }

    const featured_4 = {
        "backdrop_path": "/gOlMx8kFIIUmYVRIKuLbaLhBJSZ.jpg",
        "id": 10330,
        "overview": "Mother and daughter bicker over everything -- what Anna wears, whom she likes and what she wants to do when she's older. In turn, Anna detests Tess's fiancé. When a magical fortune cookie switches their personalities, they each get a peek at how the other person feels, thinks and lives.",
        "poster_path": "/ipKcZ4Up7dp18XpsfYUc9NKZy3g.jpg",
        "release_date": "2003-08-05",
        "runtime": 97,
        "title": "Freaky Friday"
    }
    
    return (
        <div className="relative">
        <Carousel className="w-full h-64 overflow-hidden rounded-lg" slideInterval={7000}>
            {/*Item 1*/}
            <button className="hidden flex fixed justify-center bg-sea h-64">
                <Link to={`/manchester-by-the-sea`} state={featured_1}>
                <img src={manchester} className="h-full absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Manchester By The Sea"></img>
                </Link>
            </button>
            {/*Item 2*/}
            <button className="hidden flex fixed justify-center bg-palo h-64">
                <Link to={`/palo-alto`} state={featured_2}>
                <img src={paloAlto} className="h-full absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Palo Alto"></img>
                </Link>
            </button>
            {/*Item 3*/}
            <button className="hidden flex fixed justify-center bg-pine h-64">
                <Link to={`/the-place-beyond-the-pines`} state={featured_3}>
                <img src={pines} className="h-full absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Place Beyond The Pines"></img>
                </Link>
            </button>
            {/*Item 4*/}
            <button className="hidden flex fixed justify-center bg-stone-100 h-64">
                <Link to={`/freaky-friday`} state={featured_4}>
                <img src={freakyFriday} className="h-full absolute block -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2" alt="Freaky Friday"></img>
                </Link>
            </button>
        </Carousel>
        <div className="bg-peach text-white p-2 px-4 z-10 absolute top-5 left-5 rounded-lg cursor-default">
            <p>Featured</p>
        </div>
        </div>

    )
}

export default Featured