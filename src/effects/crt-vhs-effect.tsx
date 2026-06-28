import { useMemo } from "react";
import Effect from "@/components/effect";
import crtVhsShader from "@/shaders/crt-vhs.glsl";
import useEffectsStore from "@/stores/effects-store";

const CrtVhsEffect = () => {
  const properties = useEffectsStore((state) => state.properties["crt-vhs"]);

  const uniforms = useMemo(
    () => [
      { name: "scanlines_opacity", value: properties.scanlinesOpacity as number },
      { name: "scanlines_width", value: properties.scanlinesWidth as number },
      { name: "grille_opacity", value: properties.grilleOpacity as number },
      { name: "pixelate", value: properties.pixelate as boolean },
      { name: "roll", value: properties.roll as boolean },
      { name: "roll_speed", value: properties.rollSpeed as number },
      { name: "roll_size", value: properties.rollSize as number },
      { name: "roll_variation", value: properties.rollVariation as number },
      { name: "distort_intensity", value: properties.distortIntensity as number },
      { name: "noise_opacity", value: properties.noiseOpacity as number },
      { name: "noise_speed", value: properties.noiseSpeed as number },
      { name: "static_noise_intensity", value: properties.staticNoiseIntensity as number },
      { name: "aberration", value: properties.aberration as number },
      { name: "brightness", value: properties.brightness as number },
      { name: "discolor", value: properties.discolor as boolean },
      { name: "warp_amount", value: properties.warpAmount as number },
      { name: "clip_warp", value: properties.clipWarp as boolean },
      { name: "vignette_intensity", value: properties.vignetteIntensity as number },
      { name: "vignette_opacity", value: properties.vignetteOpacity as number },
    ],
    [properties],
  );

  return <Effect name="CrtVhs" shader={crtVhsShader} uniforms={uniforms} />;
};

export default CrtVhsEffect;
