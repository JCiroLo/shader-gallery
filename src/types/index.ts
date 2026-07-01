export type Tab = "effects" | "layers" | "properties";

export type Effect =
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

export type EffectProperties = {
  tint: "color" | "opacity";
  warp: "intensity";
  crt: "pixelSize";
  "simple-crt-vhs":
    | "scanlines1"
    | "scanlines2"
    | "scanReduction"
    | "vinnetteAlpla"
    | "vinnetteInnerRadius"
    | "vinnetteOuterRadius";
  "crt-vhs":
    | "scanlinesOpacity"
    | "scanlinesWidth"
    | "grilleOpacity"
    | "pixelate"
    | "roll"
    | "rollSpeed"
    | "rollSize"
    | "rollVariation"
    | "distortIntensity"
    | "noiseOpacity"
    | "noiseSpeed"
    | "staticNoiseIntensity"
    | "aberration"
    | "brightness"
    | "discolor"
    | "warpAmount"
    | "clipWarp"
    | "vignetteIntensity"
    | "vignetteOpacity";
  "film-grain": "amount" | "speed";
  "lens-array": "gridSize" | "curvature" | "gridAngle" | "shape" | "scale" | "stagger";
  "metal-core":
    | "exposure"
    | "contrast"
    | "saturation"
    | "enablePixelate"
    | "pixelFactor"
    | "enablePosterize"
    | "colorLevels"
    | "ditherStrength"
    | "chromAberration"
    | "vignetteStrength"
    | "grainStrength"
    | "tintColor"
    | "tintStrength";
  posterize: "noiseScale" | "colorLevels" | "ditherStrength";
  sepia:
    | "noiseScale"
    | "vignetteStrength"
    | "sepiaStrength"
    | "contrast"
    | "glowRange"
    | "glowStrength"
    | "glowFalloff"
    | "dirtStrength"
    | "glowFalloff"
    | "dirtStrength"
    | "dirtScale";
  ps1:
    | "colorBitDepth"
    | "ditherStrength"
    | "jitterAmount"
    | "jitterSpeed"
    | "jitterFrequency"
    | "chromaticAberrationStrength"
    | "vignetteStrength"
    | "vignetteRadius";
  "dithering-plus-color-palettes": "rows" | "cols" | "ditherSize" | "ditherAmount" | "pal";
  "analog-monochrome-monitor": "opacity" | "pixelSize" | "greyscale" | "contrast" | "pixelColors" | "backgroundColor";
  bloom: "strength" | "radius" | "threshold" | "softness" | "saturationWeight";
};

export type EffectInput =
  | EffectInputColor
  | EffectInputNumber
  | EffectInputBoolean
  | EffectInputArray2
  | EffectInputArray3
  | EffectInputSelect;

export type EffectInputColor = {
  key: string;
  label: string;
  icon: EffectInputIcon;
  type: "color";
  value: string;
};

export type EffectInputNumber = {
  key: string;
  label: string;
  icon: EffectInputIcon;
  type: "number";
  value: number;
  min: number;
  max: number;
  step?: number;
};

export type EffectInputBoolean = {
  key: string;
  label: string;
  icon: EffectInputIcon;
  type: "boolean";
  value: boolean;
};

export type EffectInputArray2 = {
  key: string;
  label: string;
  icon: EffectInputIcon;
  type: "array-2";
  value: [number, number];
  min: number;
  max: number;
  step?: number;
};

export type EffectInputArray3 = {
  key: string;
  label: string;
  icon: EffectInputIcon;
  type: "array-3";
  value: [number, number, number];
  min: number;
  max: number;
  step?: number;
};

export type EffectInputSelect = {
  key: string;
  label: string;
  icon: EffectInputIcon;
  type: "select";
  value: string;
  options: Record<string, EffectInputSelectOption>;
};

export type EffectInputSelectOption = {
  key: string;
  label: string;
  value: number | string[];
};

export type EffectInputIcon =
  | "paint-bucket"
  | "blend"
  | "gauge"
  | "tv"
  | "antenna"
  | "maximize"
  | "radius"
  | "circle-arrow-out-down-right"
  | "rows-4"
  | "square-stack"
  | "barrel"
  | "zodiac-aquarius"
  | "camera"
  | "sun"
  | "paintbrush"
  | "diff"
  | "grid-3x3"
  | "spline"
  | "ruler"
  | "shapes"
  | "scaling"
  | "layers-2"
  | "aperture"
  | "contrast"
  | "spray-can"
  | "triangle-dashed"
  | "shell"
  | "drafting-compass"
  | "pencil"
  | "lightbulb"
  | "arrow-up-down"
  | "arrow-left-right"
  | "scale-3d"
  | "palette"
  | "droplet-off"
  | "scissors-line-dashed"
  | "feather";

export type EffectInputType = "color" | "number" | "boolean" | "array-2" | "array-3" | "select";
