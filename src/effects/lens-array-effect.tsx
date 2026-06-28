import { useMemo } from "react";
import * as THREE from "three";
import Effect from "@/components/effect";
import lensArrayShader from "@/shaders/lens-array.glsl";
import useEffectsStore from "@/stores/effects-store";
import { EFFECT_DEFAULTS } from "@/lib/constants";

const LensArrayEffect = () => {
  const properties = useEffectsStore((state) => state.properties["lens-array"]);

  const uniforms = useMemo(
    () => [
      { name: "grid_size", value: properties.gridSize as number },
      { name: "curvature", value: properties.curvature as number },
      { name: "grid_angle", value: properties.gridAngle as number },
      {
        name: "shape",
        value: EFFECT_DEFAULTS["lens-array"].shape.options![properties.shape as string].value as number,
      },
      { name: "scale", value: new THREE.Vector2(...(properties.scale as number[])) },
      { name: "stagger", value: properties.stagger ? 1.0 : 0.0 },
    ],
    [properties],
  );

  return <Effect name="LensArray" shader={lensArrayShader} uniforms={uniforms} />;
};

export default LensArrayEffect;
