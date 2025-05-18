import { useState } from "react";
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

const TABS = [
  { key: "background", label: "Fondos" },
  { key: "dice", label: "Dados" },
];

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
  const [activeTab, setActiveTab] = useState<"background" | "dice">(
    "background"
  );

  const items = STORE_ITEMS.filter((i) => i.type === activeTab);
  const unlocked =
    activeTab === "background" ? unlockedBackgrounds : unlockedDice;
  const selected =
    activeTab === "background" ? selectedBackground : selectedDice;

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
        <h2 style={{ marginBottom: "1.5rem" }}>Tienda</h2>
        <div
          className="store-tabs"
          style={{ display: "flex", gap: "1rem", marginBottom: "2rem" }}
        >
          {TABS.map((tab) => (
            <button
              key={tab.key}
              className={
                activeTab === tab.key ? "store-tab-active" : "store-tab"
              }
              onClick={() => setActiveTab(tab.key as "background" | "dice")}
              style={{
                padding: "0.5em 1.5em",
                borderRadius: "999px",
                border: "none",
                background: activeTab === tab.key ? "#4F46E5" : "#eee",
                color: activeTab === tab.key ? "#fff" : "#222",
                fontWeight: 700,
                fontSize: "1.1em",
                cursor: "pointer",
                transition: "background 0.2s, color 0.2s",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="store-grid">
          {items.map((item) => {
            const isUnlocked = unlocked.includes(item.id);
            const isSelected = selected === item.id;
            return (
              <div className="store-item" key={item.id}>
                <div
                  className="store-preview"
                  style={{ background: item.preview }}
                />
                <span>{item.name}</span>
                {isUnlocked ? (
                  <button
                    className={isSelected ? "selected" : ""}
                    onClick={() => onSelect(item)}
                  >
                    {isSelected ? "Seleccionado" : "Seleccionar"}
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
