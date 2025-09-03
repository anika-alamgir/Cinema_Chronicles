import { Button, Container, Table, Text, Input, Box } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
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
import { useAuthUser } from "../store/authUser";

const AllMovies = () => {
    const [movies, setMovies] = useState([]);
    const [editingMovie, setEditingMovie] = useState(null);
    const [updatedMovie, setUpdatedMovie] = useState({});
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

    const { user, logout } = useAuthUser();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get("/api/admin/movies");

                setMovies(response.data.content);
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        };

        fetchUsers();
    }, []);

    const deleteMovie = async (id) => {
        try {
            const res = await axios.delete(`/api/admin/movie/${id}`);
            console.log("Movie deleted successfully");
            toast.success(res.data.msg || "User deleted successfully");

            setMovies(movies.filter((movie) => movie.id !== id));
            window.location.reload();
        } catch (error) {
            toast.error("Error deleting user");
            console.error("Error deleting user:", error);
        }
    };

    const startEditing = (movie) => {
        setEditingMovie(movie.movie_id);
        setUpdatedMovie(movie);
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUpdatedMovie({ ...updatedMovie, [name]: value });
    };

    const updateMovie = async (id) => {
        try {
            await axios.patch(`/api/admin/movie/${id}`, updatedMovie);
            toast.success("Movie updated successfully");
            setEditingMovie(null);
            window.location.reload();
        } catch (error) {
            toast.error("Error updating movie");
            console.error("Error updating movie:", error);
        }
    };

    const handleNewMovieChange = (e) => {
        const { name, value } = e.target;
        setNewMovie({ ...newMovie, [name]: value });
    };

    const addMovie = async () => {
        try {
            await axios.post("/api/admin/addmovie", newMovie);
            toast.success("Movie added successfully");
            window.location.reload();
        } catch (error) {
            toast.error("Error adding movie");
            console.error("Error adding movie:", error);
        }
    };

    console.log(movies[0]);

    return (
        <Container>
            <Text
                fontWeight={"bold"}
                fontSize={{ base: "xl", md: "3xl" }}
                my={4}
                textAlign={"center"}
            >
                Manage Movies
                <Button mt={4} onClick={logout}>
                    Logout
                </Button>
            </Text>

            <Box w={{ base: "xl", md: "6xl" }} mx={"auto"}>
                <DialogRoot
                    lazyMount
                    open={open}
                    onOpenChange={(e) => setOpen(e.open)}
                >
                    <DialogTrigger asChild>
                        <Button bg={"cyan"}>Add Movie</Button>
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
                <Table.ScrollArea borderWidth='1px' overflowX={"auto"}>
                    <Table.Root
                        p={4}
                        variant={"outline"}
                        mt={4}
                        borderWidth='1px'
                    >
                        <Table.Header>
                            <Table.Row>
                                <Table.ColumnHeader>Title</Table.ColumnHeader>
                                <Table.ColumnHeader>
                                    Box Office
                                </Table.ColumnHeader>
                                <Table.ColumnHeader>
                                    Description
                                </Table.ColumnHeader>
                                <Table.ColumnHeader>Budget</Table.ColumnHeader>
                                <Table.ColumnHeader>Genre</Table.ColumnHeader>
                                <Table.ColumnHeader>
                                    Director
                                </Table.ColumnHeader>
                                <Table.ColumnHeader>Trailer</Table.ColumnHeader>
                                <Table.ColumnHeader>
                                    Release Year
                                </Table.ColumnHeader>
                                <Table.ColumnHeader>
                                    Language
                                </Table.ColumnHeader>
                                <Table.ColumnHeader>
                                    Duration
                                </Table.ColumnHeader>
                                <Table.ColumnHeader>Poster</Table.ColumnHeader>
                                <Table.ColumnHeader>
                                    Update Info
                                </Table.ColumnHeader>
                                <Table.ColumnHeader>
                                    Delete Movie
                                </Table.ColumnHeader>
                            </Table.Row>
                        </Table.Header>
                        <Table.Body>
                            {movies.map((movie) => (
                                <Table.Row key={movie.movie_id}>
                                    {editingMovie === movie.movie_id ? (
                                        <>
                                            <Table.Cell>
                                                <Input
                                                    name='title'
                                                    value={updatedMovie.title}
                                                    onChange={handleInputChange}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    name='box_office'
                                                    value={
                                                        updatedMovie.box_office
                                                    }
                                                    onChange={handleInputChange}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    name='description'
                                                    value={
                                                        updatedMovie.description
                                                    }
                                                    onChange={handleInputChange}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    name='budget'
                                                    value={updatedMovie.budget}
                                                    onChange={handleInputChange}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    name='genre'
                                                    value={updatedMovie.genre}
                                                    onChange={handleInputChange}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    name='director'
                                                    value={
                                                        updatedMovie.director
                                                    }
                                                    onChange={handleInputChange}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    name='trailer'
                                                    value={updatedMovie.trailer}
                                                    onChange={handleInputChange}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    name='release_year'
                                                    value={
                                                        updatedMovie.release_year
                                                    }
                                                    onChange={handleInputChange}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    name='language'
                                                    value={
                                                        updatedMovie.language
                                                    }
                                                    onChange={handleInputChange}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    name='duration'
                                                    value={
                                                        updatedMovie.duration
                                                    }
                                                    onChange={handleInputChange}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Input
                                                    name='poster'
                                                    value={updatedMovie.poster}
                                                    onChange={handleInputChange}
                                                />
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button
                                                    bg={"cyan.500"}
                                                    onClick={() =>
                                                        updateMovie(
                                                            movie.movie_id
                                                        )
                                                    }
                                                >
                                                    Save
                                                </Button>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button
                                                    bg={"gray.500"}
                                                    onClick={() =>
                                                        setEditingMovie(null)
                                                    }
                                                >
                                                    Cancel
                                                </Button>
                                            </Table.Cell>
                                        </>
                                    ) : (
                                        <>
                                            <Table.Cell>
                                                {movie.title}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {movie.box_office}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {movie.description}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {movie.budget}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {movie.genre}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {movie.director}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {movie.trailer}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {movie.release_year}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {movie.language}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {movie.duration}
                                            </Table.Cell>
                                            <Table.Cell>
                                                {movie.poster}
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button
                                                    bg={"cyan.500"}
                                                    onClick={() =>
                                                        startEditing(movie)
                                                    }
                                                >
                                                    Update Info
                                                </Button>
                                            </Table.Cell>
                                            <Table.Cell>
                                                <Button
                                                    onClick={() =>
                                                        deleteMovie(
                                                            movie.movie_id
                                                        )
                                                    }
                                                    bg={"red.500"}
                                                >
                                                    Delete
                                                </Button>
                                            </Table.Cell>
                                        </>
                                    )}
                                </Table.Row>
                            ))}
                        </Table.Body>
                    </Table.Root>
                </Table.ScrollArea>
            </Box>
        </Container>
    );
};

export default AllMovies;
