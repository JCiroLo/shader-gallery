import { create } from "zustand";
import { DEFAULT_EFFECTS_PANEL_SIZE, DEFAULT_IMAGE } from "@/lib/constants";
import type { Effect, Tab } from "@/types";

type EffectsPanelSize = {
  width: number;
  height: {
    default: number;
    active: number;
  };
};

type SettingsStore = {
  image: string;
  tab: Tab;
  previousTab: Tab;
  effect: Effect | null;
  optionsVisible: boolean;
  effectsPanelSize: EffectsPanelSize;
  setImage: (image: string) => void;
  setTab: (tab: Tab) => void;
  setEffect: (effect: Effect | null) => void;
  toggleOptionsVisible: () => void;
  setEffectsPanelSize: (size: EffectsPanelSize) => void;
};

const useSettingsStore = create<SettingsStore>((set, get) => ({
  image: DEFAULT_IMAGE,
  tab: "effects",
  previousTab: "effects",
  effect: null,
  optionsVisible: true,
  effectsPanelSize: DEFAULT_EFFECTS_PANEL_SIZE,
  setImage: (image) => set({ image }),
  setTab: (tab) => set({ tab, previousTab: get().tab }),
  setEffect: (effect) => set({ effect }),
  toggleOptionsVisible: () => set({ optionsVisible: !get().optionsVisible }),
  setEffectsPanelSize: (size) => set({ effectsPanelSize: size }),
}));

export default useSettingsStore;
