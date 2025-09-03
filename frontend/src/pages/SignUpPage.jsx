import {
    Box,
    Text,
    AbsoluteCenter,
    Stack,
    Input,
    HStack,
    Button,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthUser } from "../store/authUser";

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const [fname, setFname] = useState("");
    const [lname, setLname] = useState("");
    const [password, setPassword] = useState("");
    const [dob, setDob] = useState("");

    const { signup } = useAuthUser();

    const handleSignUp = (e) => {
        e.preventDefault();
        try {
            signup({ email, fname, lname, password, dob });
        } catch (error) {
            console.log("Error signing up", error);
        }
    };

    return (
        <Box
            color={"white"}
            bgAttachment='fixed'
            bgImage='url(./auth_page_bg.jpg)'
            position={"relative"}
            w={"full"}
            h={"100vh"}
        >
            <AbsoluteCenter>
                <Box
                    w={{ base: "90%", md: "600px" }}
                    h={{ base: "auto", md: "700px" }}
                    bg={"black/40"}
                    rounded={"2xl"}
                    p={{ base: 4, md: 8 }}
                    shadow={"md"}
                >
                    <form onSubmit={handleSignUp}>
                        <Stack
                            p={2}
                            gap={{ base: 2, md: 4 }}
                            h={"100%"}
                            justify={"center"}
                        >
                            {/* email, fname, lname, password, dob */}
                            <Text
                                color={"cyan"}
                                mb={5}
                                fontSize={"2xl"}
                                textAlign={"center"}
                            >
                                Create an Account
                            </Text>
                            <Field label='Email' required>
                                <Input
                                    type='email'
                                    size={"lg"}
                                    placeholder='Enter Your Email Address'
                                    variant='flushed'
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </Field>

                            <HStack
                                gap={{ base: 2, md: 10 }}
                                flexDirection={{ base: "column", md: "row" }}
                            >
                                <Field label='First Name' required>
                                    <Input
                                        type='text'
                                        size={"lg"}
                                        placeholder='Enter Your First Name'
                                        variant='flushed'
                                        value={fname}
                                        onChange={(e) =>
                                            setFname(e.target.value)
                                        }
                                    />
                                </Field>
                                <Field label='Last Name'>
                                    <Input
                                        type='text'
                                        size={"lg"}
                                        placeholder='Enter Your Last Name'
                                        variant='flushed'
                                        value={lname}
                                        onChange={(e) =>
                                            setLname(e.target.value)
                                        }
                                    />
                                </Field>
                            </HStack>

                            <Field label='Password' required>
                                <PasswordInput
                                    type='password'
                                    size={"lg"}
                                    placeholder='Enter Your Password'
                                    variant='flushed'
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </Field>
                            <Field label='Date of Birth' required>
                                <Input
                                    type='date'
                                    size={"lg"}
                                    placeholder='Enter Your Date of Birth'
                                    variant='flushed'
                                    value={dob}
                                    onChange={(e) => setDob(e.target.value)}
                                />
                            </Field>
                            <Box mt={3}>
                                <Button type='submit' colorPalette={"cyan"}>
                                    Register
                                </Button>
                            </Box>
                            <Box mt={5} textAlign={"center"}>
                                Are you already a member?{" "}
                                <Link to={"/login"} style={{ color: "cyan" }}>
                                    Log in
                                </Link>
                            </Box>
                            <Box textAlign={"center"}>
                                Want to register as an admin?{" "}
                                <Link
                                    to={"/adminsignup"}
                                    style={{ color: "cyan" }}
                                >
                                    Sign in
                                </Link>
                            </Box>
                        </Stack>
                    </form>
                </Box>
            </AbsoluteCenter>
        </Box>
    );
};

export default SignUpPage;
