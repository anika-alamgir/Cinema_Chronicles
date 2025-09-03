/* eslint-disable react/prop-types */
import { Button, Card, Image, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorModeValue } from "@/components/ui/color-mode";
import axios from "axios";
import toast from "react-hot-toast";

const MovieCard = ({ movie }) => {
    const buttonBg = useColorModeValue("black", "white");
    const buttonColor = useColorModeValue("black", "white");

    const addToWatchlist = async () => {
        try {
            const res = await axios.post(
                `/api/user/watchlist/${movie.movie_id}`
            );
            if (!res.data.success) {
                toast.error("Movie added to watchlist.");
            } else {
                toast.success(res.data.message);
            }
        } catch (error) {
            console.error("Error adding movie to watchlist", error);
            toast.error("Failed to add movie to watchlist.");
        }
    };

    return (
        <>
            <Card.Root h={"xl"} shadow={"xl"}>
                <Image
                    src={movie.posterUrl || "/download.jpg"}
                    w={"100%"}
                    h={"50%"}
                    alt={`${movie.title} poster`}
                />
                <Card.Body gap='2'>
                    <Card.Title>{movie.title || "title"}</Card.Title>
                    <Card.Description>
                        {movie.description ||
                            "Description Loading. Please wait a moment..."}
                    </Card.Description>
                    <Text textStyle='xs' mt='2'>
                        Duration: {movie.duration}
                    </Text>
                </Card.Body>
                <Card.Footer gap='2'>
                    <Button
                        color={buttonColor}
                        variant='outline'
                        onClick={addToWatchlist}
                    >
                        Add to watchlist
                    </Button>
                    <Link to={`/details/${movie.movie_id}`}>
                        <Button bg={buttonBg}>Get Details</Button>
                    </Link>
                </Card.Footer>
            </Card.Root>
        </>
    );
};

export default MovieCard;
