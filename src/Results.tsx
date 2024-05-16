import { Button } from "@mui/material"
import { useQuestionsData } from "./hooks/useQuestionsData"
import { useQuestionsStore } from "./store/questions"

export const Results = () => {
  const { correct, incorrect } = useQuestionsData()
  const reset = useQuestionsStore(state => state.reset)

  return (
    <div style={{ marginTop: '16px'}}>
      <h1>¡Yours results</h1>

      <strong>
        <p>✅ {correct} correct answers</p>
        <p>❌ {incorrect} incorrect answers</p>
      </strong>

      <div style={{ marginTop: '16px' }}>
        <Button onClick={() => reset()}>
          ¡Start Again!
        </Button>
      </div>
    </div>
  )
}