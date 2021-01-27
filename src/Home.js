import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
    const [blogs, setBlogs] = useState(null);
    const [isPeding, setIsPending] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('http://localhost:8000/blogs')
        .then((res) => {
            if (!res.ok) {
                throw Error('Could not fetch the data for the resource')
            }
            return res.json()
        })
        .then((data) => {
            setBlogs(data);
            setIsPending(false);
            setError(null);
        })
        .catch((error) => {
            setIsPending(false);
            setError(error.message);
        })
    }, []);

    return ( 
        <div className="home">
            {error && <div>{error}</div>}
            {isPeding && <div>Loading...</div>}
            {blogs && <BlogList blogs={blogs} title="All Blogs"/>}
        </div>
     );
}
 
export default Home;