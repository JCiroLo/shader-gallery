import { useMemo } from "react";
import Effect from "@/components/effect";
import warpShader from "@/shaders/warp.glsl.ts";
import useEffectsStore from "@/stores/effects-store";

const WarpEffect = () => {
  const properties = useEffectsStore((state) => state.properties.warp);

  const uniforms = useMemo(() => [{ name: "intensity", value: properties.intensity as number }], [properties]);

  return <Effect name="Warp" shader={warpShader} uniforms={uniforms} />;
};

export default WarpEffect;
