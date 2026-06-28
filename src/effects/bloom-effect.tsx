import { useMemo } from "react";
import useEffectsStore from "@/stores/effects-store";
import Effect from "@/components/effect";
import bloomShader from "@/shaders/bloom.glsl";

const BloomEffect = () => {
  const properties = useEffectsStore((state) => state.properties["bloom"]);

  const uniforms = useMemo(
    () => [
      { name: "strength", value: properties.strength as number },
      { name: "radius", value: properties.radius as number },
      { name: "threshold", value: properties.threshold as number },
      { name: "softness", value: properties.softness as number },
      { name: "saturation_weight", value: properties.saturationWeight as number },
    ],
    [properties],
  );

  return <Effect name="Bloom" shader={bloomShader} uniforms={uniforms} />;
};

export default BloomEffect;
