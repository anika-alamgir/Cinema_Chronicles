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
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuthUser } from "../store/authUser";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [newpass, setNewPassword] = useState("");

  const Navigate = useNavigate();

  const { forgotPassword } = useAuthUser();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await forgotPassword({ email, newpass });
      Navigate("/login");
    } catch (error) {
      console.log(error);
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
          <form onSubmit={handleSignUp}>
            <Stack p={2} gap={{ base: 2, md: 4 }} h={"100%"} justify={"center"}>
              <Text mb={5} color={"cyan"} fontSize={"2xl"} textAlign={"center"}>
                Reset Password
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

              <Field label="New Password" required>
                <PasswordInput
                  type="password"
                  size={"lg"}
                  placeholder="Enter Your Password"
                  variant="flushed"
                  value={newpass}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </Field>

              <Box mt={3}>
                <Button type="submit" colorPalette={"cyan"}>
                  Reset
                </Button>
              </Box>

              <Box textAlign={"center"} mt={3}>
                After resetting password click here to{" "}
                <Link to={"/login"} style={{ color: "cyan" }}>
                  Login
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

export default ForgotPassword;
