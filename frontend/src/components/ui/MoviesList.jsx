import { Box, Button, Flex, Image, Input, Text } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

import {
    DialogActionTrigger,
    DialogBody,
    DialogCloseTrigger,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogRoot,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import { Link } from "react-router-dom";

const MoviesList = () => {
    const [movies, setMovies] = useState([]);
    const [open, setOpen] = useState(false);
    const [newMovie, setNewMovie] = useState({
        title: "",
        box_office: "",
        description: "",
        budget: "",
        genre: "",
        director: "",
        trailer: "",
        release_year: "",
        language: "",
        duration: "",
        posterUrl: "",
    });

    const { colorMode } = useColorMode();
    const bgColor = colorMode === "light" ? "gray.300" : "gray.700";

    const fetchMovies = async () => {
        try {
            const response = await axios.get("/api/admin/movies");

            setMovies(response.data.content);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    const handleNewMovieChange = (e) => {
        const { name, value } = e.target;
        setNewMovie({ ...newMovie, [name]: value });
    };

    const addMovie = async () => {
        try {
            await axios.post("/api/admin/addmovie", newMovie);
            setOpen(false);

            await fetchMovies();
            toast.success("Movie added successfully");
        } catch (error) {
            toast.error("Error adding movie");
            console.error("Error adding movie:", error);
        }
    };

    const deleteMovie = async (id) => {
        try {
            await axios.delete(`/api/admin/movie/${id}`);
            console.log("Movie deleted successfully");
            toast.success("Movie deleted successfully");

            await fetchMovies();
        } catch (error) {
            toast.error("Error deleting user");
            console.error("Error deleting user:", error);
        }
    };

    useEffect(() => {
        fetchMovies();
    }, []);

    return (
        <Box maxW={"full"}>
            <Flex justifyContent={"space-between"} align={"center"}>
                <Text
                    fontWeight={"extrabold"}
                    fontSize={{ base: "2xl", md: "4xl" }}
                    mb={4}
                >
                    Movies List
                </Text>
                <Flex>
                    <DialogRoot
                        lazyMount
                        open={open}
                        onOpenChange={(e) => setOpen(e.open)}
                    >
                        <DialogTrigger asChild>
                            <Button colorPalette={"cyan"}>Add Movie</Button>
                        </DialogTrigger>

                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Dialog Title</DialogTitle>
                            </DialogHeader>
                            <DialogBody>
                                <Input
                                    placeholder='Title'
                                    name='title'
                                    value={newMovie.title}
                                    onChange={handleNewMovieChange}
                                    mb={3}
                                />
                                <Input
                                    placeholder='Box Office'
                                    name='box_office'
                                    value={newMovie.box_office}
                                    onChange={handleNewMovieChange}
                                    mb={3}
                                />
                                <Input
                                    placeholder='Description'
                                    name='description'
                                    value={newMovie.description}
                                    onChange={handleNewMovieChange}
                                    mb={3}
                                />
                                <Input
                                    placeholder='Budget'
                                    name='budget'
                                    value={newMovie.budget}
                                    onChange={handleNewMovieChange}
                                    mb={3}
                                />
                                <Input
                                    placeholder='Genre'
                                    name='genre'
                                    value={newMovie.genre}
                                    onChange={handleNewMovieChange}
                                    mb={3}
                                />
                                <Input
                                    placeholder='Director'
                                    name='director'
                                    value={newMovie.director}
                                    onChange={handleNewMovieChange}
                                    mb={3}
                                />
                                <Input
                                    placeholder='Trailer'
                                    name='trailer'
                                    value={newMovie.trailer}
                                    onChange={handleNewMovieChange}
                                    mb={3}
                                />
                                <Input
                                    placeholder='Release Year'
                                    name='release_year'
                                    value={newMovie.release_year}
                                    onChange={handleNewMovieChange}
                                    mb={3}
                                />
                                <Input
                                    placeholder='Language'
                                    name='language'
                                    value={newMovie.language}
                                    onChange={handleNewMovieChange}
                                    mb={3}
                                />
                                <Input
                                    placeholder='Duration'
                                    name='duration'
                                    value={newMovie.duration}
                                    onChange={handleNewMovieChange}
                                    mb={3}
                                />
                                <Input
                                    placeholder='Poster URL'
                                    name='posterUrl'
                                    value={newMovie.posterUrl}
                                    onChange={handleNewMovieChange}
                                    mb={3}
                                />
                            </DialogBody>
                            <DialogFooter>
                                <DialogActionTrigger asChild>
                                    <Button variant='ghost' onClick={setOpen}>
                                        Cancel
                                    </Button>
                                </DialogActionTrigger>
                                <Button
                                    colorScheme='blue'
                                    mr={3}
                                    onClick={addMovie}
                                >
                                    Save
                                </Button>
                            </DialogFooter>
                            <DialogCloseTrigger />
                        </DialogContent>
                    </DialogRoot>
                </Flex>
            </Flex>

            {movies.length == 0 && (
                <Text fontSize={"xl"} fontWeight={"bold"}>
                    No Movies found
                </Text>
            )}

            {movies.length != 0 &&
                movies.map((movie) => (
                    <Box
                        bg={bgColor}
                        p={4}
                        mt={4}
                        rounded={"md"}
                        key={movie.movie_id}
                    >
                        <Flex
                            direction={{ base: "column", md: "row" }}
                            align={"center"}
                        >
                            {!movie.posterUrl && (
                                <Image
                                    src='https://img.freepik.com/free-vector/404-concept-illustration_114360-26118.jpg?t=st=1739897149~exp=1739900749~hmac=0b9af7edca299c4e99ba97daa3b1ff83b4e77e6035e6658645f0957e9b655a1b&w=740'
                                    alt={movie.title}
                                    w={{ base: "full", md: "250px" }}
                                    h={{ base: "200px", md: "400px" }}
                                    rounded={"md"}
                                />
                            )}
                            {movie.posterUrl && (
                                <Image
                                    src={movie.posterUrl}
                                    alt={movie.title}
                                    w={{ base: "full", md: "250px" }}
                                    h={{ base: "full", md: "400px" }}
                                    rounded={"md"}
                                />
                            )}

                            <Box ml={4} mt={{ base: 4, md: 0 }}>
                                <Text fontSize={"xl"} fontWeight={"extrabold"}>
                                    {movie.title}
                                </Text>
                                <Text
                                    mt={2}
                                    fontWeight={"bold"}
                                    fontSize={"xl"}
                                >
                                    Description :{" "}
                                    <Text as={"span"} fontWeight={"normal"}>
                                        {movie.description}
                                    </Text>
                                </Text>
                                <Text
                                    mt={2}
                                    fontWeight={"bold"}
                                    fontSize={"xl"}
                                >
                                    Director :{" "}
                                    <Text as={"span"} fontWeight={"normal"}>
                                        {movie.director}
                                    </Text>
                                </Text>
                                <Text
                                    mt={2}
                                    fontWeight={"bold"}
                                    fontSize={"xl"}
                                >
                                    Genre :{" "}
                                    <Text as={"span"} fontWeight={"normal"}>
                                        {movie.genre}
                                    </Text>
                                </Text>
                                <Text
                                    mt={2}
                                    fontWeight={"bold"}
                                    fontSize={"xl"}
                                >
                                    Language :{" "}
                                    <Text as={"span"} fontWeight={"normal"}>
                                        {movie.language}
                                    </Text>
                                </Text>
                                <Text
                                    mt={2}
                                    fontWeight={"bold"}
                                    fontSize={"xl"}
                                >
                                    Duration :{" "}
                                    <Text as={"span"} fontWeight={"normal"}>
                                        {movie.duration}
                                    </Text>
                                </Text>
                                <Text
                                    mt={2}
                                    fontWeight={"bold"}
                                    fontSize={"xl"}
                                >
                                    Release Year :{" "}
                                    <Text as={"span"} fontWeight={"normal"}>
                                        {movie.release_year}
                                    </Text>
                                </Text>
                                <Text
                                    mt={2}
                                    fontWeight={"bold"}
                                    fontSize={"xl"}
                                >
                                    Budget :{" "}
                                    <Text as={"span"} fontWeight={"normal"}>
                                        {movie.budget}
                                    </Text>
                                </Text>
                                <Text
                                    mt={2}
                                    fontWeight={"bold"}
                                    fontSize={"xl"}
                                >
                                    Box Office :{" "}
                                    <Text as={"span"} fontWeight={"normal"}>
                                        {movie.box_office}
                                    </Text>
                                </Text>
                                <Link to={movie.trailer} target='_blank'>
                                    <Text fontWeight={"bold"} fontSize={"xl"}>
                                        Trailer :{" "}
                                        <Text
                                            as={"span"}
                                            color={"red.500"}
                                            fontWeight={"normal"}
                                        >
                                            {movie.trailer}
                                        </Text>
                                    </Text>
                                </Link>
                            </Box>
                        </Flex>
                        <Flex
                            justifyContent={"space-between"}
                            mt={4}
                            gap={4}
                            grow={1}
                        >
                            <Button colorPalette={"teal"}>Update Info</Button>
                            <Button
                                colorPalette={"red"}
                                onClick={() => deleteMovie(movie.movie_id)}
                            >
                                Delete Movie
                            </Button>
                        </Flex>
                    </Box>
                ))}
        </Box>
    );
};

export default MoviesList;
