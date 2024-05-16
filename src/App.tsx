import "./App.css";
import { JavaScriptLogo } from "./JavaScriptLogo";
import { Container, Stack, Typography, useTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Start } from "./Start";
import { useQuestionsStore } from "./store/questions";
import { Game } from "./Game";

function App() {
  const questions = useQuestionsStore((state) => state.questions);

  const theme = useTheme();
  console.log(questions);

  const medium = useMediaQuery(theme.breakpoints.up("md"));

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction="row"
          gap={2}
          alignItems="center"
          justifyContent="center"
        >
          <JavaScriptLogo />
          <Typography variant={medium ? "h2" : "h5"} component="h1" style={{ marginTop: "16px" }}>
            JavaScript Quiz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}

        <strong
          style={{ display: "block", fontSize: "16px", marginTop: "48px" }}
        >
          Developed with TypeScript + Zustand -{" "}
          <a
            style={{ color: "yellow" }}
            href="https://github.com/GuillermoTorrez/13-javascript-quiz"
          >
            Go to Code
          </a>
        </strong>
      </Container>
    </main>
  );
}

export default App;
