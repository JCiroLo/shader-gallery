import { create } from "zustand";
import { EFFECT_DEFAULTS } from "@/lib/constants";
import EffectTools from "@/lib/effect-tools";
import type { Effect, EffectInput } from "@/types";

type EffectsStore = {
  queue: Set<Effect>;
  properties: Record<Effect, Record<string, unknown>>;
  addEffect: (effect: Effect) => void;
  removeEffect: (effect: Effect) => void;
  setEffectProperty: <T extends keyof Record<Effect, EffectInput[]>>(
    effect: T,
    property: keyof Record<Effect, EffectInput[]>[T],
    value: unknown,
  ) => void;
  resetEffectProperties: (effect: Effect) => void;
};

const properties = Object.entries(EFFECT_DEFAULTS).reduce(
  (prev, [effect, properties]) => ({
    ...prev,
    [effect]: EffectTools.getProperties(properties),
  }),
  {} as Record<Effect, Record<string, unknown>>,
);

const useEffectsStore = create<EffectsStore>((set, get) => ({
  queue: new Set(),
  properties: properties,
  version: 0, // just for re-renders
  addEffect: (effect: Effect) => {
    const newQueue = new Set(get().queue);
    newQueue.add(effect);
    set({ queue: newQueue });
  },
  removeEffect: (effect: Effect) => {
    const newQueue = new Set(get().queue);
    newQueue.delete(effect);
    set({ queue: newQueue });
  },
  setEffectProperty: (effect, property, value) => {
    // TODO: add debounce
    set({
      properties: {
        ...get().properties,
        [effect]: { ...get().properties[effect], [property]: value },
      },
    });
  },
  resetEffectProperties: (effect) =>
    set({ properties: { ...get().properties, [effect]: EffectTools.getProperties(EFFECT_DEFAULTS[effect]) } }),
}));

export default useEffectsStore;
