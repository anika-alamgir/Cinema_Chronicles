import { Box, Button, Container, Flex, HStack, Text } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useColorMode } from "@/components/ui/color-mode";

import CCLogo from "../components/ui/CCLogo";
import { useAuthUser } from "../store/authUser";
import { LogOut, Moon, Sun } from "lucide-react";
import { useState } from "react";
import MoviesList from "../components/ui/MoviesList";
import UsersList from "../components/ui/UsersList";

const AdminDashboard = () => {
    const { colorMode, toggleColorMode } = useColorMode();
    const [list, setList] = useState("users");

    const bgColor = colorMode === "light" ? "gray.300" : "gray.700";

    const { user, logout } = useAuthUser();
    console.log("user", user.user.first_name);

    return (
        <Container maxW={"8xl"}>
            <Flex justify='space-between' p={4} align='center'>
                <Link>
                    <CCLogo />
                </Link>

                <HStack gap={4}>
                    <Button onClick={toggleColorMode}>
                        {colorMode === "light" ? <Moon /> : <Sun />}
                    </Button>
                    <LogOut
                        color={"white"}
                        onClick={logout}
                        cursor={"pointer"}
                    />
                </HStack>
            </Flex>

            <Text fontWeight={"bold"} fontSize={"3xl"} textAlign={"center"}>
                Greetings, {user?.user?.last_name}
            </Text>

            <HStack justifyContent={"center"} mt={8}>
                <Button
                    w={"50%"}
                    variant='subtle'
                    shadow={"lg"}
                    bg={list === "users" && bgColor}
                    onClick={() => setList("users")}
                >
                    USERS
                </Button>
                <Button
                    w={"50%"}
                    variant='subtle'
                    shadow={"lg"}
                    bg={list === "movies" && bgColor}
                    onClick={() => setList("movies")}
                >
                    MOVIES
                </Button>
            </HStack>
            <Box mt={8}>
                {list === "movies" && <MoviesList />}
                {list === "users" && <UsersList />}
            </Box>
        </Container>
    );
};

export default AdminDashboard;
