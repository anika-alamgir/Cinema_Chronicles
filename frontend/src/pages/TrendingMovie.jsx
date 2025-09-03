import Footer from "../components/ui/Footer";
import Navbar from "../components/ui/Navbar";
import ReactPlayer from "react-player";
import {
  Box,
  Container,
  Image,
  Text,
  VStack,
  Span,
  Button,
} from "@chakra-ui/react";
import FeedbackForm from "../components/ui/FeedbackForm";
import { useState } from "react";
import useGetTrendingMovie from "../hooks/useGetTrendingMovie";
import { useColorModeValue } from "@/components/ui/color-mode";

const TrendingMovie = () => {
  const { trendingMovie: movie, reviews } = useGetTrendingMovie();

  const buttonBg = useColorModeValue("black", "white");
  const buttonColor = useColorModeValue("white", "black");

  const [showForm, setShowForm] = useState(false);

  const handleButtonClick = () => {
    setShowForm(!showForm);
  };

  return (
    <>
      <Navbar />
      <Container>
        <Box p={5}>
          <Box>
            <Text
              as={"h1"}
              fontSize={{ base: "2xl", md: "4xl" }}
              fontWeight={"bold"}
              my={5}
            >
              {movie.title}
            </Text>
            <Box>
              <Image
                alt={`${movie.title} poster`}
                src={
                  "https://plus.unsplash.com/premium_photo-1664474619075-644dd191935f?q=80&w=1169&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                }
              />
            </Box>
            <Box>
              <Text fontSize={{ base: "md", md: "xl" }} my={5}>
                {movie.description}
              </Text>
              <Text
                fontWeight={"bold"}
                fontSize={{ base: "md", md: "xl" }}
                my={5}
              >
                Language: <Span fontWeight={"normal"}>{movie.language}</Span>
              </Text>
              <Text
                fontWeight={"bold"}
                fontSize={{ base: "md", md: "xl" }}
                my={5}
              >
                Release Year:{" "}
                <Span fontWeight={"normal"}>{movie.release_year}</Span>
              </Text>
              <Text
                fontWeight={"bold"}
                fontSize={{ base: "md", md: "xl" }}
                my={5}
              >
                Duration:{" "}
                <Span fontWeight={"normal"}>
                  {movie.duration}
                  {"  minutes"}
                </Span>
              </Text>
              <Text
                fontWeight={"bold"}
                fontSize={{ base: "md", md: "xl" }}
                my={5}
              >
                Box Office:{" "}
                <Span fontWeight={"normal"}>
                  {"  $"}
                  {movie.box_office}
                  {"  M"}
                </Span>
              </Text>
              <Text
                fontWeight={"bold"}
                fontSize={{ base: "md", md: "xl" }}
                my={5}
              >
                Genre:{" "}
                <Span fontWeight={"normal"}>{movie.genre || "Romance"}</Span>
              </Text>
              <Text
                fontWeight={"bold"}
                fontSize={{ base: "md", md: "xl" }}
                my={5}
              >
                Directed By:{" "}
                <Span fontWeight={"normal"}>{movie.director || "Romance"}</Span>
              </Text>
              <Text
                fontWeight={"bold"}
                fontSize={{ base: "md", md: "xl" }}
                my={5}
              >
                Cast: <Span fontWeight={"normal"}>dkfgjbkfgb</Span>
              </Text>
              <Text
                fontWeight={"bold"}
                fontSize={{ base: "md", md: "xl" }}
                my={5}
              >
                Budget: <Span fontWeight={"normal"}>{movie.budget}M</Span>
              </Text>

              {reviews.length > 0 ? (
                reviews.map((review) => (
                  <VStack align={"start"} key={review.review_id}>
                    <Text
                      fontWeight={"bold"}
                      fontSize={{ base: "md", md: "xl" }}
                      my={5}
                    >
                      Rating:{" "}
                      <Span fontWeight={"normal"}>
                        {review.rating}
                        {"  "}
                      </Span>
                    </Text>
                    <Text
                      w={"full"}
                      p={3}
                      bg={"cyan.700"}
                      color={buttonColor}
                      borderRadius={"md"}
                      fontSize={{ base: "md", md: "xl" }}
                    >
                      {review.review}
                    </Text>
                  </VStack>
                ))
              ) : (
                <Text
                  fontWeight={"bold"}
                  fontSize={{ base: "md", md: "xl" }}
                  color={"red.500"}
                  my={5}
                >
                  ** No reviews available.
                </Text>
              )}

              <Button
                mt={5}
                bg={buttonBg}
                color={buttonColor}
                onClick={handleButtonClick}
              >
                {showForm ? "Hide review form" : "Add review"}
              </Button>
              {showForm && <FeedbackForm movieId={movie.movie_id} />}

              <Box fontWeight={"bold"} my={5} p={3}>
                <Text fontSize={{ base: "md", md: "xl" }} my={5}>
                  Trailer
                </Text>
                <Box mt={5} w={"full"} h={"md"}>
                  <ReactPlayer
                    width={"100%"}
                    height={"100%"}
                    controls
                    url={movie.trailer}
                  />
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
      <Footer />
    </>
  );
};

export default TrendingMovie;
