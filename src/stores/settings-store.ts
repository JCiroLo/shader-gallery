import { create } from "zustand";
import type { Effect } from "@/types";

type SettingsStore = {
  effect: Effect;
  image: string;
  optionsVisible: boolean;
  setEffect: (effect: Effect) => void;
  setImage: (image: string) => void;
  toggleOptionsVisible: () => void;
};

const useSettingsStore = create<SettingsStore>((set, get) => ({
  effect: "none",
  image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=1964&q=80",
  optionsVisible: true,
  setEffect: (effect: Effect) => set({ effect }),
  setImage: (image: string) => set({ image }),
  toggleOptionsVisible: () => set({ optionsVisible: !get().optionsVisible }),
}));

export default useSettingsStore;
