export interface DiceProps {
  value: number;
  isRolling: boolean;
  type: "tens" | "units";
  color?: string;
}

export interface GameState {
  tensValue: number;
  unitsValue: number;
  userGuess: string;
  isCorrect: boolean | null;
  isRolling: boolean;
  score: number;
}

export interface ResultMessageProps {
  isCorrect: boolean | null;
  correctAnswer: number;
}
