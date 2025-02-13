import {
  Typography,
  Card,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  IconButton,
  Stack
} from "@mui/material";
import { useQuestionsStore } from "./store/questions";
import { type Question as QuestionType } from "./types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { gradientDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { ArrowBackIosNew, ArrowForwardIos } from '@mui/icons-material'
import { Footer } from './Footer'


const getBackgroundColor = (info: QuestionType, index: number) => {
    const { userSelectedAnswer, correctAnswer } = info
    // user haven't select yet 
    if (userSelectedAnswer == null) return 'transparent'
    // if was selected but the solution is incorrect 
    if (index !== correctAnswer && index !== userSelectedAnswer) return 'transparent'
    // This is the correct solution
    if (index === correctAnswer) return 'green'
    // if was select but the solution is incorrect 
    if (index === userSelectedAnswer) return 'red'
    // others
    return 'transparent'
  }

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer);

  const createHandleClick = (answerIndex: number) => () => {
    selectAnswer(info.id, answerIndex);
  };
  return (
    <>
      <Card
        variant="outlined"
        sx={{ textAlign: "left", bgcolor: "#222", p: "2" }}
      >
        <Typography>{info.question}</Typography>
        <SyntaxHighlighter language="javascript" style={gradientDark}>
          {info.code}
        </SyntaxHighlighter>

        <List sx={{ bgcolor: "#333" }} disablePadding>
          {info.answers.map((answer, index) => (
            <ListItem key={index} disablePadding divider>
              <ListItemButton
                disabled={info.userSelectedAnswer != null}
                onClick={createHandleClick(index)}
                sx={{
                  backgroundColor: getBackgroundColor(info, index),
                }}
              >
                <ListItemText primary={answer} sx={{ textAlign: "center" }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
};

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions);
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion);
  const questionInfo = questions[currentQuestion];
  const goNextQuestion = useQuestionsStore((state) => state.goNextQuestion);
  const goPreviousQuestion = useQuestionsStore(
    (state) => state.goPreviousQuestion
  );

  return (
    <>
     <Stack direction='row' gap={2} alignItems='center' justifyContent='center'>
        <IconButton onClick={goPreviousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>

        {currentQuestion + 1} / {questions.length}

        <IconButton onClick={goNextQuestion} disabled={currentQuestion >= questions.length - 1}>
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question info={questionInfo} /> <Footer />

    </>
  );
};
