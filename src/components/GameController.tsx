import { useState, useCallback } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Dice3D } from "./Dice3D";
import { GuessInput } from "./GuessInput";
import { ResultMessage } from "./ResultMessage";
import { Store } from "./Store";
import type { GameState } from "../types/game";
import type { StoreState } from "../types/store";
import type { StoreItem } from "../types/store";
import { STORE_ITEMS } from "../types/store";

const getRandomNumber = (max: number) => Math.floor(Math.random() * (max + 1));

export const GameController = () => {
  const [gameState, setGameState] = useState<GameState>({
    tensValue: 0,
    unitsValue: 0,
    userGuess: "",
    isCorrect: null,
    isRolling: false,
    score: 110,
  });

  const [storeState, setStoreState] = useState<StoreState>({
    unlockedBackgrounds: ["bg-default"],
    unlockedDice: ["dice-blue"],
    selectedBackground: "bg-default",
    selectedDice: "dice-blue",
  });

  const [storeOpen, setStoreOpen] = useState(false);

  const rollDice = useCallback(() => {
    setGameState((prev) => ({
      ...prev,
      isRolling: true,
      isCorrect: null,
      userGuess: "",
    }));

    setTimeout(() => {
      setGameState((prev) => ({
        ...prev,
        tensValue: getRandomNumber(9) * 10,
        unitsValue: getRandomNumber(9),
        isRolling: false,
      }));
    }, 1000);
  }, []);

  const checkAnswer = useCallback(() => {
    const correctAnswer = gameState.tensValue + gameState.unitsValue;
    const isCorrect = parseInt(gameState.userGuess) === correctAnswer;

    setGameState((prev) => ({
      ...prev,
      isCorrect,
      score: isCorrect ? prev.score + 1 : prev.score,
    }));
  }, [gameState.tensValue, gameState.unitsValue, gameState.userGuess]);

  // Tienda: comprar y seleccionar
  const handleBuy = (item: StoreItem) => {
    if (gameState.score < item.price) return;
    setGameState((prev) => ({ ...prev, score: prev.score - item.price }));
    setStoreState((prev) => {
      if (item.type === "background") {
        return {
          ...prev,
          unlockedBackgrounds: [...prev.unlockedBackgrounds, item.id],
        };
      } else {
        return {
          ...prev,
          unlockedDice: [...prev.unlockedDice, item.id],
        };
      }
    });
  };

  const handleSelect = (item: StoreItem) => {
    setStoreState((prev) => {
      if (item.type === "background") {
        return { ...prev, selectedBackground: item.id };
      } else {
        return { ...prev, selectedDice: item.id };
      }
    });
  };

  // Aplicar fondo seleccionado
  const selectedBg = STORE_ITEMS.find(
    (i) => i.id === storeState.selectedBackground
  );
  const bgStyle =
    selectedBg?.type === "background" ? { background: selectedBg.preview } : {};

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        maxWidth: "100vw",
        maxHeight: "100vh",
        overflow: "hidden",
        ...bgStyle,
      }}
    >
      <div
        className="w-full"
        style={{ padding: "24px", boxSizing: "border-box" }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <div>Puntuación: {gameState.score}</div>
          <button
            onClick={() => setStoreOpen(true)}
            style={{
              marginLeft: 8,
              padding: "0.5em 1em",
              borderRadius: 8,
              background: "#eee",
              color: "#222",
              border: "1px solid #bbb",
              fontWeight: 600,
            }}
          >
            🛒 Tienda
          </button>
        </div>
        <h1>Aprende los Números</h1>
        <div className="w-full">
          <Canvas camera={{ position: [0, 0, 20] }}>
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} />
            <group position={[-4, 0, 0]}>
              <Dice3D
                value={gameState.tensValue}
                isRolling={gameState.isRolling}
                type="tens"
                color={
                  storeState.selectedDice === "dice-green"
                    ? "#22c55e"
                    : storeState.selectedDice === "dice-pink"
                    ? "#ec4899"
                    : "#3b82f6"
                }
              />
            </group>
            <group position={[4, 0, 0]}>
              <Dice3D
                value={gameState.unitsValue}
                isRolling={gameState.isRolling}
                type="units"
                color={
                  storeState.selectedDice === "dice-green"
                    ? "#22c55e"
                    : storeState.selectedDice === "dice-pink"
                    ? "#ec4899"
                    : "#3b82f6"
                }
              />
            </group>
            <OrbitControls enableZoom={false} />
          </Canvas>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <button
            onClick={rollDice}
            disabled={gameState.isRolling}
            style={{ width: "100%" }}
          >
            Lanzar Dados
          </button>
          <GuessInput
            value={gameState.userGuess}
            onChange={(value) =>
              setGameState((prev) => ({ ...prev, userGuess: value }))
            }
            onSubmit={checkAnswer}
            disabled={gameState.isRolling || gameState.isCorrect === true}
          />
          <ResultMessage
            isCorrect={gameState.isCorrect}
            correctAnswer={gameState.tensValue + gameState.unitsValue}
          />
        </div>
      </div>
      {storeOpen && (
        <Store
          score={gameState.score}
          unlockedBackgrounds={storeState.unlockedBackgrounds}
          unlockedDice={storeState.unlockedDice}
          selectedBackground={storeState.selectedBackground}
          selectedDice={storeState.selectedDice}
          onBuy={handleBuy}
          onSelect={handleSelect}
          onClose={() => setStoreOpen(false)}
        />
      )}
    </div>
  );
};
