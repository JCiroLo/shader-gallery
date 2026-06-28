import { useMemo } from "react";
import posterizeShader from "@/shaders/posterize.glsl";
import Effect from "@/components/effect";
import useEffectsStore from "@/stores/effects-store";

const PosterizeEffect = () => {
  const properties = useEffectsStore((state) => state.properties["posterize"]);

  const uniforms = useMemo(
    () => [
      { name: "noise_scale", value: properties.noiseScale as number },
      { name: "color_levels", value: properties.colorLevels as number },
      { name: "dither_strength", value: properties.ditherStrength as number },
    ],
    [properties],
  );

  return <Effect name="Posterize" shader={posterizeShader} uniforms={uniforms} />;
};

export default PosterizeEffect;
