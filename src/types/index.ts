export type Effect = "none" | "tint" | "warp" | "crt" | "crt-vhs" | "lens-array" | "metal-core" | "posterize";

export type EffectInput = {
  key: string;
  label: string;
  type: "color" | "number" | "boolean" | "array-2" | "array-3" | "select";
  value: unknown;

  // for number, array-2, array-3
  min?: number;
  max?: number;
  step?: number;

  // for select
  options?: { label: string; value: number }[];
};

export type EffectsOptions = Record<Exclude<Effect, "none">, EffectInput[]>;

export type CrtEffect = {
  pixelSize: number;
};

export type CrtVhsEffect = {
  scanlinesOpacity: number;
  scanlinesWidth: number;
  grilleOpacity: number;
  pixelate: boolean;
  roll: boolean;
  rollSpeed: number;
  rollSize: number;
  rollVariation: number;
  distortIntensity: number;
  noiseOpacity: number;
  noiseSpeed: number;
  staticNoiseIntensity: number;
  aberration: number;
  brightness: number;
  discolor: boolean;
  warpAmount: number;
  clipWarp: boolean;
  vignetteIntensity: number;
  vignetteOpacity: number;
};

export type LensArrayEffect = {
  gridSize: number;
  curvature: number;
  gridAngle: number;
  shape: number;
  scale: [number, number];
  stagger: boolean;
};

export type MetalCoreEffect = {
  exposure: number;
  contrast: number;
  saturation: number;
  enablePixelate: boolean;
  pixelFactor: number;
  enablePosterize: boolean;
  colorLevels: number;
  ditherStrength: number;
  chromAberration: number;
  vignetteStrength: number;
  grainStrength: number;
  tintColor: [number, number, number];
  tintStrength: number;
  viewportSize: [number, number];
  time?: number;
};

export type PosterizerEffect = {
  noiseScale: number;
  colorLevels: number;
  ditherStrength: number;
};

export type TintEffect = {
  color: string;
  opacity: number;
};

export type WarpEffect = {
  intensity: number;
};
