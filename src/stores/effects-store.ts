import { create } from "zustand";
import { EFFECT_DEFAULTS } from "@/lib/constants";
import type { Effect, EffectsOptions } from "@/types";

type EffectsStore = {
  properties: Record<Effect, Record<string, unknown>>;
  setEffectProperty: <T extends keyof EffectsOptions>(
    effect: T,
    property: keyof EffectsOptions[T],
    value: unknown,
  ) => void;
};

const properties = Object.entries(EFFECT_DEFAULTS).reduce(
  (prev, [effect, properties]) => ({
    ...prev,
    [effect]: Object.entries(properties).reduce(
      (prev, [property, options]) => ({ ...prev, [property]: options.value }),
      {},
    ),
  }),
  {} as Record<Effect, Record<string, unknown>>,
);

const useEffectsStore = create<EffectsStore>((set, get) => ({
  properties: properties,
  setEffectProperty: (effect, property, value) => {
    // TODO: add debounce
    set({
      properties: {
        ...get().properties,
        [effect]: { ...get().properties[effect], [property]: value },
      },
    });
  },
}));

export default useEffectsStore;
