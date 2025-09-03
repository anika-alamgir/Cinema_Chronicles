import axios from "axios";
import { useEffect, useState } from "react";

const useGetTrendingMovie = () => {
  const [trendingMovie, setTrendingMovie] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTrendingMovie = async () => {
      try {
        const response = await axios.get("/api/movie/trending");
        setTrendingMovie(response.data.content);
        setReviews(response.data.review);
      } catch (error) {
        console.error(
          "Error fetching trending movie:",
          error.response?.data || error.message
        );
        setError("Failed to fetch movie details. Please try again later.");
      }
    };

    fetchTrendingMovie();
  }, []);

  return { trendingMovie, reviews, error };
};

export default useGetTrendingMovie;
