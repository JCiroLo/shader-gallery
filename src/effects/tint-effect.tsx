import * as THREE from "three";
import Effect from "@/components/effect";
import tintShader from "@/shaders/tint.glsl.ts";
import useEffectsStore from "@/stores/effects-store";

const TintEffect = () => {
  const uniforms = useEffectsStore((state) => state.properties.tint);

  return (
    <Effect
      name="Tint"
      shader={tintShader}
      uniforms={[
        { name: "uColor", value: new THREE.Color(uniforms.color as string) },
        { name: "uOpacity", value: uniforms.opacity as number },
      ]}
    />
  );
};

export default TintEffect;
