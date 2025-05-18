import { AVAILABLE_BACKGROUNDS, type Background } from "../types/store";

interface BackgroundStoreProps {
  score: number;
  unlockedBackgrounds: string[];
  selectedBackground: string;
  onPurchase: (background: Background) => void;
  onSelect: (backgroundId: string) => void;
}

export const BackgroundStore = ({
  score,
  unlockedBackgrounds,
  selectedBackground,
  onPurchase,
  onSelect,
}: BackgroundStoreProps) => {
  return (
    <div>
      <h2>Tienda de Fondos</h2>
      <div>
        {AVAILABLE_BACKGROUNDS.map((background) => {
          const isUnlocked = unlockedBackgrounds.includes(background.id);
          const isSelected = selectedBackground === background.id;
          const canAfford = score >= background.price;

          return (
            <div
              key={background.id}
              className={`p-3 rounded-lg border-2 ${
                isSelected
                  ? "border-primary bg-primary/10"
                  : "border-gray-200 hover:border-primary/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`w-8 h-8 rounded ${
                      background.gradient || "bg-gray-100"
                    }`}
                    style={
                      background.color
                        ? { backgroundColor: background.color }
                        : {}
                    }
                  />
                  <span className="font-medium text-gray-900">
                    {background.name}
                  </span>
                </div>
                {isUnlocked ? (
                  <button
                    onClick={() => onSelect(background.id)}
                    className={`px-3 py-1 rounded text-sm text-gray-900 ${
                      isSelected
                        ? "bg-primary text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {isSelected ? "Seleccionado" : "Seleccionar"}
                  </button>
                ) : (
                  <button
                    onClick={() => onPurchase(background)}
                    disabled={!canAfford}
                    className={`px-3 py-1 rounded text-sm text-gray-900 ${
                      canAfford
                        ? "bg-secondary text-white hover:bg-secondary/90"
                        : "bg-gray-200 text-gray-400 cursor-not-allowed"
                    }`}
                  >
                    {background.price} puntos
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
