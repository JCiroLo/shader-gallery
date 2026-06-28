import { useMemo } from "react";
import Effect from "@/components/effect";
import sepiaShader from "@/shaders/sepia.glsl.ts";
import useEffectsStore from "@/stores/effects-store";

const SepiaEffect = () => {
  const properties = useEffectsStore((state) => state.properties.sepia);

  const uniforms = useMemo(
    () => [
      { name: "noise_scale", value: properties.noiseScale as number },
      { name: "vignette_strength", value: properties.vignetteStrength as number },
      { name: "sepia_strength", value: properties.sepiaStrength as number },
      { name: "contrast", value: properties.contrast as number },
      { name: "glow_range", value: properties.glowRange as number },
      { name: "glow_strength", value: properties.glowStrength as number },
      { name: "glow_falloff", value: properties.glowFalloff as number },
      { name: "dirt_strength", value: properties.dirtStrength as number },
      { name: "dirt_scale", value: properties.dirtScale as number },
    ],
    [properties],
  );

  return <Effect name="Sepia" shader={sepiaShader} uniforms={uniforms} />;
};

export default SepiaEffect;
