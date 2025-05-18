import type { ChangeEvent } from "react";

interface GuessInputProps {
  value: string;
  onChange: (value: string) => void;
  onSubmit: () => void;
  disabled: boolean;
}

export const GuessInput = ({
  value,
  onChange,
  onSubmit,
  disabled,
}: GuessInputProps) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^0-9]/g, "");
    if (newValue.length <= 3) {
      onChange(newValue);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 16,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <input
        type="text"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        placeholder="Escribe el número"
      />
      <button onClick={onSubmit} disabled={disabled}>
        Comprobar
      </button>
    </div>
  );
};
