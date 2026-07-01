import type { EffectInput } from "@/types";

const EffectTools = {
  getProperties: (properties: Record<string, EffectInput>) =>
    Object.entries(properties).reduce((prev, [property, options]) => ({ ...prev, [property]: options.value }), {}),
};

export default EffectTools;
