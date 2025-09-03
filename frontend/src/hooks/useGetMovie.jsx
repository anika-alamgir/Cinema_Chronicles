import { useEffect, useState } from "react";
import axios from "axios";

const useGetMovie = (id) => {
  const [movie, setMovie] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        const response = await axios.get(`/api/movie/details/${id}`);
        setMovie(response.data.content);
        setReviews(response.data.review);
      } catch (error) {
        console.error(
          "Error fetching movie:",
          error.response?.data || error.message
        );
        setError("Failed to fetch movie details. Please try again later.");
      }
    };

    fetchMovie();
  }, [id]);

  return { movie, reviews, error };
};

export default useGetMovie;
