export interface Question {
  id: number;
  question: string;
  code: string;
  answers: string[];
  correctAnswer: number;
  userSelectedAnswer?: number;
  isCorrectUserAnswer?: boolean;
}

export interface State {
  questions: Question[];
  currentQuestion: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPreviousQuestion: () => void;
  reset: () => void;
}
