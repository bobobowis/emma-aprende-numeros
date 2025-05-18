import { STORE_ITEMS } from "../types/store";
import type { StoreItem } from "../types/store";

interface StoreProps {
  score: number;
  unlockedBackgrounds: string[];
  unlockedDice: string[];
  selectedBackground: string;
  selectedDice: string;
  onBuy: (item: StoreItem) => void;
  onSelect: (item: StoreItem) => void;
  onClose: () => void;
}

export function Store({
  score,
  unlockedBackgrounds,
  unlockedDice,
  selectedBackground,
  selectedDice,
  onBuy,
  onSelect,
  onClose,
}: StoreProps) {
  return (
    <div
      className="store-modal"
      style={{ minHeight: "100vh", height: "100vh" }}
    >
      <div
        className="store-content"
        style={{ padding: "2.5rem", minHeight: "80vh" }}
      >
        <button className="store-close" onClick={onClose}>
          X
        </button>
        <h2>Tienda</h2>
        <h3>Fondos</h3>
        <div className="store-list">
          {STORE_ITEMS.filter((i) => i.type === "background").map((item) => {
            const unlocked = unlockedBackgrounds.includes(item.id);
            const selected = selectedBackground === item.id;
            return (
              <div className="store-item" key={item.id}>
                <div
                  className="store-preview"
                  style={{ background: item.preview }}
                />
                <span>{item.name}</span>
                {unlocked ? (
                  <button
                    className={selected ? "selected" : ""}
                    onClick={() => onSelect(item)}
                  >
                    {selected ? "Seleccionado" : "Seleccionar"}
                  </button>
                ) : (
                  <button
                    disabled={score < item.price}
                    onClick={() => onBuy(item)}
                  >
                    Comprar ({item.price} pts)
                  </button>
                )}
              </div>
            );
          })}
        </div>
        <h3>Dados</h3>
        <div className="store-list">
          {STORE_ITEMS.filter((i) => i.type === "dice").map((item) => {
            const unlocked = unlockedDice.includes(item.id);
            const selected = selectedDice === item.id;
            return (
              <div className="store-item" key={item.id}>
                <div
                  className="store-preview"
                  style={{ background: item.preview }}
                />
                <span>{item.name}</span>
                {unlocked ? (
                  <button
                    className={selected ? "selected" : ""}
                    onClick={() => onSelect(item)}
                  >
                    {selected ? "Seleccionado" : "Seleccionar"}
                  </button>
                ) : (
                  <button
                    disabled={score < item.price}
                    onClick={() => onBuy(item)}
                  >
                    Comprar ({item.price} pts)
                  </button>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
