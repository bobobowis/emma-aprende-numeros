export interface Background {
  id: string;
  name: string;
  price: number;
  color?: string;
  gradient?: string;
}

export interface StoreItem {
  id: string;
  name: string;
  price: number;
  type: "background" | "dice";
  preview: string; // puede ser color, gradiente, o nombre de imagen
}

export interface StoreState {
  unlockedBackgrounds: string[];
  unlockedDice: string[];
  selectedBackground: string;
  selectedDice: string;
}

export const AVAILABLE_BACKGROUNDS: Background[] = [
  {
    id: "default",
    name: "Clásico",
    price: 0,
    color: "#f9fafb",
  },
  {
    id: "sunset",
    name: "Atardecer",
    price: 10,
    gradient: "bg-gradient-to-br from-orange-200 via-pink-200 to-purple-200",
  },
  {
    id: "ocean",
    name: "Océano",
    price: 20,
    gradient: "bg-gradient-to-br from-blue-200 via-cyan-200 to-teal-200",
  },
  {
    id: "forest",
    name: "Bosque",
    price: 30,
    gradient: "bg-gradient-to-br from-green-200 via-emerald-200 to-teal-200",
  },
  {
    id: "rainbow",
    name: "Arcoíris",
    price: 50,
    gradient: "bg-gradient-to-r from-red-200 via-yellow-200 to-purple-200",
  },
];

export const STORE_ITEMS: StoreItem[] = [
  {
    id: "bg-default",
    name: "Clásico",
    price: 0,
    type: "background",
    preview: "#f9fafb",
  },
  {
    id: "bg-sunset",
    name: "Atardecer",
    price: 10,
    type: "background",
    preview: "linear-gradient(135deg, #fca5a5, #fcd34d, #a5b4fc)",
  },
  {
    id: "bg-ocean",
    name: "Océano",
    price: 20,
    type: "background",
    preview: "linear-gradient(135deg, #38bdf8, #06b6d4, #22d3ee)",
  },
  {
    id: "dice-blue",
    name: "Dado Azul",
    price: 0,
    type: "dice",
    preview: "#3b82f6",
  },
  {
    id: "dice-green",
    name: "Dado Verde",
    price: 10,
    type: "dice",
    preview: "#22c55e",
  },
  {
    id: "dice-pink",
    name: "Dado Rosa",
    price: 20,
    type: "dice",
    preview: "#ec4899",
  },
];
