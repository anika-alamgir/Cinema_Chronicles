import MovieCard from "../components/ui/MovieCard";
import { Container, Grid, GridItem, Text } from "@chakra-ui/react";
import useGetAllMovies from "../hooks/useGetAllMovies";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";

const HomePage = () => {
  const { movies } = useGetAllMovies();

  return (
    <>
      <Navbar />

      <Container>
        <Grid
          templateColumns={{
            base: "repeat(1, 1fr)",
            md: "repeat(2, 1fr)",
            lg: "repeat(3, 1fr)",
          }}
          gap={8}
          justifyContent={"center"}
        >
          {movies && movies.length > 0 ? (
            movies.map((movie, i) => (
              <GridItem key={i}>
                <MovieCard movie={movie} />
              </GridItem>
            ))
          ) : (
            <Text>No movies available</Text>
          )}
        </Grid>
      </Container>
      <Footer />
    </>
  );
};

export default HomePage;
