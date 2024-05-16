import { Button } from "@mui/material";
import { useQuestionsStore } from "./store/questions";

const LIMIT_QUESTION = 10;

export const Start = () => {
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions);

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTION);
  };
  return (
    <div style={{ marginTop: "16px" }}>
      <Button onClick={handleClick} variant="contained">
        Start!
      </Button>
    </div>
  );
};
