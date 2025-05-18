import type { ResultMessageProps } from "../types/game";

export const ResultMessage = ({
  isCorrect,
  correctAnswer,
}: ResultMessageProps) => {
  if (isCorrect === null) return null;

  return (
    <div>
      {isCorrect ? (
        <div>
          <span>✅</span>
          <span>¡Correcto!</span>
        </div>
      ) : (
        <div>
          <div>
            <span>❌</span>
            <span>Inténtalo de nuevo</span>
          </div>
          <span>El número era: {correctAnswer}</span>
        </div>
      )}
    </div>
  );
};
