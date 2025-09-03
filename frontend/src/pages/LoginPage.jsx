import {
  Box,
  Text,
  AbsoluteCenter,
  Stack,
  Input,
  Button,
} from "@chakra-ui/react";
import { Field } from "@/components/ui/field";
import { PasswordInput } from "@/components/ui/password-input";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useAuthUser } from "../store/authUser";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuthUser();

  const handleLogin = (e) => {
    e.preventDefault();
    try {
      login({ email, password });
    } catch (error) {
      console.log("Error logging in", error);
    }
  };

  return (
    <Box
      color={"white"}
      bgAttachment="fixed"
      bgImage="url(./auth_page_bg.jpg)"
      position={"relative"}
      w={"full"}
      h={"100vh"}
    >
      <AbsoluteCenter>
        <Box
          w={{ base: "90%", md: "600px" }}
          h={{ base: "auto", md: "550px" }}
          bg={"black/40"}
          rounded={"2xl"}
          p={{ base: 4, md: 8 }}
          shadow={"md"}
        >
          <form onSubmit={handleLogin}>
            <Stack p={2} gap={{ base: 2, md: 4 }} h={"100%"} justify={"center"}>
              {/* email, fname, lname, password, dob */}
              <Text mb={5} color={"cyan"} fontSize={"2xl"} textAlign={"center"}>
                Log In
              </Text>
              <Field label="Email" required>
                <Input
                  type="email"
                  size={"lg"}
                  placeholder="Enter Your Email Address"
                  variant="flushed"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Field>

              <Field label="Password" required>
                <PasswordInput
                  type="password"
                  size={"lg"}
                  placeholder="Enter Your Password"
                  variant="flushed"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Field>

              <Box mt={3}>
                <Button type="submit" colorPalette={"cyan"}>
                  Login
                </Button>
              </Box>
              <Box mt={5} textAlign={"center"}>
                Forgot password?{" "}
                <Link to={"/forgotpassword"} style={{ color: "cyan" }}>
                  Click here
                </Link>
              </Box>
              <Box textAlign={"center"}>
                Not a member?{" "}
                <Link to={"/signup"} style={{ color: "cyan" }}>
                  Sign in
                </Link>
              </Box>
              <Box textAlign={"center"}>
                Want to Log in as an admin?{" "}
                <Link to={"/adminlogin"} style={{ color: "cyan" }}>
                  Log in
                </Link>
              </Box>
            </Stack>
          </form>
        </Box>
      </AbsoluteCenter>
    </Box>
  );
};

export default LoginPage;
