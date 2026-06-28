import { useMemo } from "react";
import * as THREE from "three";
import metalCoreShader from "@/shaders/metal-core.glsl";
import Effect from "@/components/effect";
import useEffectsStore from "@/stores/effects-store";

const MetalCoreEffect = () => {
  const properties = useEffectsStore((state) => state.properties["metal-core"]);

  const uniforms = useMemo(
    () => [
      { name: "exposure", value: properties.exposure as number },
      { name: "contrast", value: properties.contrast as number },
      { name: "saturation", value: properties.saturation as number },
      { name: "enablePixelate", value: properties.enablePixelate as boolean },
      { name: "pixelFactor", value: properties.pixelFactor as number },
      { name: "enablePosterize", value: properties.enablePosterize as boolean },
      { name: "colorLevels", value: properties.colorLevels as number },
      { name: "ditherStrength", value: properties.ditherStrength as number },
      { name: "chromAberration", value: properties.chromAberration as number },
      { name: "vignetteStrength", value: properties.vignetteStrength as number },
      { name: "grainStrength", value: properties.grainStrength as number },
      { name: "tintColor", value: new THREE.Color(properties.tintColor as string) },
      { name: "tintStrength", value: properties.tintStrength as number },
    ],
    [properties],
  );

  return <Effect name="MetalCore" shader={metalCoreShader} uniforms={uniforms} />;
};

export default MetalCoreEffect;
