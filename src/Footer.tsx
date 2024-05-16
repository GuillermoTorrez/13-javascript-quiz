import { Button } from "@mui/material";
import { useQuestionsData } from "./hooks/useQuestionsData";
import { useQuestionsStore } from "./store/questions";

export const Footer = () => {
  const { correct, incorrect, unanswered } = useQuestionsData();
  const reset = useQuestionsStore((state) => state.reset);

  return (
    <footer style={{ marginTop: "16px", fontSize: "14px" }}>
      <strong>{`✅ ${correct} correct answers - ❌ ${incorrect} incorrect answers - ❓ ${unanswered} unanswered`}</strong>
      <div style={{ marginTop: "20px" }}>
        <Button onClick={() => reset()}>Reset the game</Button>
      </div>
    </footer>
  );
};
