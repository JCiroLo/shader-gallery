import { useMemo } from "react";
import Effect from "@/components/effect";
import crtShader from "@/shaders/crt.glsl";
import useEffectsStore from "@/stores/effects-store";

const CrtEffect = () => {
  const properties = useEffectsStore((state) => state.properties["crt"]);

  const uniforms = useMemo(() => [{ name: "pixel_size", value: properties.pixelSize as number }], [properties]);

  return <Effect name="Crt" shader={crtShader} uniforms={uniforms} />;
};

export default CrtEffect;
