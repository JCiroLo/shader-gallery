export type Effect =
  | "none"
  | "tint"
  | "warp"
  | "simple-crt-vhs"
  | "crt"
  | "crt-vhs"
  | "film-grain"
  | "lens-array"
  | "metal-core"
  | "posterize"
  | "sepia"
  | "ps1"
  | "dithering-plus-color-palettes"
  | "analog-monochrome-monitor"
  | "bloom";

export type EffectInput = {
  key: string;
  label: string;
  type: "color" | "number" | "boolean" | "array-2" | "array-3" | "select" | "sampler-2d";
  value: unknown;

  // for number, array-2, array-3
  min?: number;
  max?: number;
  step?: number;

  // for select
  options?: Record<string, EffectInputOption>;
};

export type EffectInputOption = { key: string; label: string; value: number | string[] };

export type EffectsOptions = Record<Exclude<Effect, "none">, EffectInput[]>;

export type CrtEffect = {
  pixelSize: number;
};
