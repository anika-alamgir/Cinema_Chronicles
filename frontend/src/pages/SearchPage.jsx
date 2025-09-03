import { useState } from "react";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    GridItem,
    Input,
} from "@chakra-ui/react";
import toast from "react-hot-toast";
import axios from "axios";
import { Search } from "lucide-react";
import MovieCard from "../components/ui/MovieCard";

import { useColorModeValue } from "@/components/ui/color-mode";

const SearchPage = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);

    const buttonBg = useColorModeValue("cyan.200", "gray.200");
    const buttonColor = useColorModeValue("gray.500", "cyan.500");
    const handleSearch = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.get(`/api/search/movie/${searchQuery}`);
            setSearchResults(res.data.content);
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error("No results found.");
            } else {
                toast.error(
                    "An error occurred. Please try again later.",
                    error
                );
            }
        }
    };

    return (
        <>
            <Box p={4}>
                <Navbar />
            </Box>
            {/* Search bar */}
            <Container>
                <Box
                    bg={buttonBg}
                    rounded={"lg"}
                    w={{ base: "xs", md: "md" }}
                    mx={"auto"}
                    p={4}
                    mt={4}
                >
                    <form>
                        <Flex>
                            <Input
                                type='text'
                                value={searchQuery}
                                color='black'
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder='Search for movies...'
                            />
                            <Button
                                color={buttonColor}
                                onClick={handleSearch}
                                bg={buttonBg}
                            >
                                <Search />
                            </Button>
                        </Flex>
                    </form>
                </Box>
                {/* Search results */}

                <Grid
                    templateColumns={{
                        base: "repeat(1, 1fr)",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(3, 1fr)",
                    }}
                    gap={8}
                    justifyContent={"center"}
                    mt={8}
                >
                    {searchResults.map((movie, i) => {
                        return (
                            <GridItem h={"xl"} key={i}>
                                <MovieCard movie={movie} />
                            </GridItem>
                        );
                    })}
                </Grid>
            </Container>

            <Footer />
        </>
    );
};

export default SearchPage;
