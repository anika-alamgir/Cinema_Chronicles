import { Box, Button, Text } from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";
import axios from "axios";

const UsersList = () => {
    const { colorMode } = useColorMode();
    const bgColor = colorMode === "light" ? "gray.300" : "gray.700";
    const [users, setUsers] = useState([]);

    const fetchUsers = async () => {
        try {
            const response = await axios.get("/api/admin/users");

            setUsers(response.data.content);
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    const deleteUser = async (id) => {
        try {
            await axios.delete(`/api/admin/user/${id}`);
            toast.success("User deleted successfully");
            await fetchUsers();
        } catch (error) {
            toast.error("Error deleting user");
            console.error("Error deleting user:", error);
        }
    };

    const getYear = (dob) => {
        const date = new Date(dob);
        return date.getFullYear();
    };

    return (
        <Box maxW={"full"}>
            <Text
                fontWeight={"extrabold"}
                fontSize={{ base: "2xl", md: "4xl" }}
                mb={4}
            >
                Users List
            </Text>

            {users.length == 0 && (
                <Text fontSize={"xl"} fontWeight={"bold"}>
                    No users found
                </Text>
            )}

            {users.length != 0 &&
                users.map((user) => (
                    <Box
                        p={4}
                        mb={4}
                        rounded={"md"}
                        bg={bgColor}
                        key={user.users_id}
                    >
                        <Text fontWeight={"bold"} fontSize={"xl"}>
                            First Name :{" "}
                            <Text as={"span"} fontWeight={"normal"}>
                                {user.first_name}
                            </Text>
                        </Text>
                        <Text fontWeight={"bold"} fontSize={"xl"}>
                            Last Name :{" "}
                            <Text as={"span"} fontWeight={"normal"}>
                                {user.last_name}
                            </Text>
                        </Text>
                        <Text fontWeight={"bold"} fontSize={"xl"}>
                            Email :{" "}
                            <Text as={"span"} fontWeight={"normal"}>
                                {user.email}
                            </Text>
                        </Text>
                        <Text fontWeight={"bold"} fontSize={"xl"}>
                            Date of Birth :{" "}
                            <Text as={"span"} fontWeight={"normal"}>
                                {getYear(user.dob)}
                            </Text>
                        </Text>
                        <Text fontWeight={"bold"} fontSize={"xl"}>
                            Role :{" "}
                            <Text as={"span"} fontWeight={"normal"}>
                                {user.role}
                            </Text>
                        </Text>

                        <Button
                            mt={3}
                            colorPalette={"red"}
                            onClick={() => deleteUser(user.users_id)}
                            disabled={user.role === "admin"}
                        >
                            Delete User
                        </Button>
                    </Box>
                ))}
        </Box>
    );
};

export default UsersList;
