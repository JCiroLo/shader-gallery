import { useMemo } from "react";
import Effect from "@/components/effect";
import ps1Shader from "@/shaders/ps1.glsl.ts";
import useEffectsStore from "@/stores/effects-store";

const Ps1Effect = () => {
  const properties = useEffectsStore((state) => state.properties.ps1);

  const uniforms = useMemo(
    () => [
      { name: "resolution_x", value: properties.resolutionX as number },
      { name: "resolution_y", value: properties.resolutionY as number },
      { name: "color_bit_depth", value: properties.colorBitDepth as number },
      { name: "dither_strength", value: properties.ditherStrength as number },
      { name: "jitter_amount", value: properties.jitterAmount as number },
      { name: "jitter_speed", value: properties.jitterSpeed as number },
      { name: "jitter_frequency", value: properties.jitterFrequency as number },
      { name: "chromatic_aberration_strength", value: properties.chromaticAberrationStrength as number },
      { name: "vignette_strength", value: properties.vignetteStrength as number },
      { name: "vignette_radius", value: properties.vignetteRadius as number },
    ],
    [properties],
  );

  return <Effect name="Ps1" shader={ps1Shader} uniforms={uniforms} />;
};

export default Ps1Effect;
