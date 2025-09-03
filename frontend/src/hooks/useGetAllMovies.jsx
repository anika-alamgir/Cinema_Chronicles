import axios from "axios";
import { useEffect, useState } from "react";

const useGetAllMovies = () => {
    const [movies, setMovies] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await axios.get("/api/movie/");
                setMovies(response.data.content);
                setLoading(false);
            } catch (error) {
                console.log(error);
                setLoading(false);
            }
        };
        fetchMovies();
    }, []);

    return { movies, loading };
};

export default useGetAllMovies;
