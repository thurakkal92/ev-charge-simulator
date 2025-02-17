import { createContext } from "react";

interface ToggleButtonGroupContextProps {
  value: string| number;
  onChange: (newValue: string| number) => void;
}

export const ToggleButtonGroupContext = createContext<ToggleButtonGroupContextProps | null>(null);