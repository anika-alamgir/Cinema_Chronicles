import { Container, Grid, GridItem, Heading, Button } from "@chakra-ui/react";
import Footer from "../components/ui/Footer";
import Navbar from "../components/ui/Navbar";
import { useAuthUser } from "../store/authUser";
import { useEffect, useState } from "react";
import axios from "axios";
import MovieCard from "../components/ui/MovieCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";

const WatchList = () => {
    const navigate = useNavigate();

    const { user } = useAuthUser();
    const [watchlist, setWatchlist] = useState([]);

    const [watchListMovies, setWatchListMovies] = useState([]);

    useEffect(() => {
        const fetchWatchlist = async () => {
            try {
                const response = await axios.get("/api/user/watchlist");
                setWatchlist(response.data.content);

                const movieDetailsPromises = response.data.content.map(
                    (movie) => axios.get(`/api/movie/details/${movie.movie_id}`)
                );

                const movieDetails = await Promise.all(movieDetailsPromises);
                setWatchListMovies(movieDetails.map((res) => res.data.content));
            } catch (error) {
                console.error(
                    "Error fetching watchlist or movie details:",
                    error
                );
            }
        };

        fetchWatchlist();
    }, []);

    const handleDelete = async (movieId) => {
        try {
            const res = await axios.delete(`/api/user/watchlist/${movieId}`);
            setWatchListMovies(
                watchListMovies.filter((movie) => movie.movie_id !== movieId)
            );
            toast.success(res.data.message, "Movie removed from watchlist.");
            window.location.reload();
        } catch (error) {
            console.error("Error deleting movie from watchlist:", error);
            toast.error("Failed to remove movie from watchlist.", error);
        }
    };

    return (
        <>
            <Navbar />
            <Container>
                <Heading mt={8}>
                    {user?.user?.first_name}&apos;s watchlist
                </Heading>
                <Grid
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    }}
                    gap={8}
                    justifyContent={"center"}
                    mt={8}
                    h={"full"}
                >
                    {watchListMovies.map((movie, i) => {
                        return (
                            <GridItem h={"full"} position={"relative"} key={i}>
                                <MovieCard movie={movie[0]} />
                                <Button
                                    position={"absolute"}
                                    size={"lg"}
                                    right={0}
                                    top={0}
                                    bg={"red.500"}
                                    color={"white"}
                                    onClick={() =>
                                        handleDelete(movie[0].movie_id)
                                    }
                                >
                                    <Trash2 />
                                </Button>
                            </GridItem>
                        );
                    })}
                </Grid>
            </Container>
            <Footer />
        </>
    );
};

export default WatchList;
