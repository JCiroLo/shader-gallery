import { useMemo } from "react";
import simpleCrtVhsShader from "@/shaders/simple-crt-vhs.glsl";
import Effect from "@/components/effect";
import useEffectsStore from "@/stores/effects-store";

const SimpleCrtVhsEffect = () => {
  const properties = useEffectsStore((state) => state.properties["simple-crt-vhs"]);

  const uniforms = useMemo(
    () => [
      { name: "scanlines_1", value: properties.scanlines1 as number },
      { name: "scanlines_2", value: properties.scanlines2 as number },
      { name: "scan_reduction", value: properties.scanReduction as number },
      { name: "vinnette_alpla", value: properties.vinnetteAlpla as number },
      { name: "vinnette_inner_radius", value: properties.vinnetteInnerRadius as number },
      { name: "vinnette_outer_radius", value: properties.vinnetteOuterRadius as number },
    ],
    [properties],
  );

  return <Effect name="SimpleCrtVhs" shader={simpleCrtVhsShader} uniforms={uniforms} />;
};

export default SimpleCrtVhsEffect;
