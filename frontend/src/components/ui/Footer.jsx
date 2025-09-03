import {
  Container,
  Text,
  Link,
  IconButton,
  Span,
  Stack,
  Box,
} from "@chakra-ui/react";
import { useColorMode } from "@/components/ui/color-mode";
import { Github, Facebook, Instagram, Linkedin } from "lucide-react";

const Footer = () => {
  const { colorMode } = useColorMode();

  const textColor = colorMode === "light" ? "cyan.700" : "cyan";
  const buttonColor = colorMode === "light" ? "black" : "cyan";

  return (
    <footer>
      <Container py={10}>
        <Stack
          direction={{ base: "column", md: "row" }}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Stack
            direction={{ base: "column", md: "row" }}
            alignItems={"center"}
          >
            Built by{" "}
            <Text color={textColor} as={"span"}>
              {" "}
              Bodruddoza Araf
            </Text>
            <Box>
              <IconButton bg={"transparent"} aria-label={"Github"}>
                <Link href="https://github.com/Bodzillaa" target="_blank">
                  <Github color={buttonColor} />
                </Link>
              </IconButton>
              <IconButton bg={"transparent"} aria-label={"Facebook"}>
                <Link
                  href="https://www.facebook.com/profile.php?id=100015323444786"
                  target="_blank"
                >
                  <Facebook color={buttonColor} />
                </Link>
              </IconButton>
              <IconButton bg={"transparent"} aria-label={"Instagram"}>
                <Link
                  href="https://www.instagram.com/_bodruddoza.araf_/"
                  target="_blank"
                >
                  <Instagram color={buttonColor} />
                </Link>
              </IconButton>
              <IconButton bg={"transparent"} aria-label={"Linkedin"}>
                <Link
                  href="https://www.linkedin.com/in/bodruddoza-araf-5989a22b7/"
                  target="_blank"
                >
                  <Linkedin color={buttonColor} />
                </Link>
              </IconButton>
            </Box>
          </Stack>
          <Text fontSize={"sm"}>
            © <Span color={textColor}>{new Date().getFullYear()} </Span> CINEMA
            CHRONICLES
          </Text>
        </Stack>
      </Container>
    </footer>
  );
};

export default Footer;
