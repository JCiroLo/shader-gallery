import { useMemo } from "react";
import Effect from "@/components/effect";
import ditheringPlusColorPalettesShader from "@/shaders/dithering-plus-color-palettes.glsl";
import useEffectsStore from "@/stores/effects-store";
import TextureTools from "@/lib/texture-tools";
import { EFFECT_DEFAULTS } from "@/lib/constants";

const DitheringPlusColorPalettesEffect = () => {
  const properties = useEffectsStore((state) => state.properties["dithering-plus-color-palettes"]);

  const uniforms = useMemo(
    () => [
      { name: "rows", value: properties.rows as number },
      { name: "cols", value: properties.cols as number },
      { name: "dither_size", value: properties.ditherSize as number },
      { name: "dither_amount", value: properties.ditherAmount as number },
      {
        name: "pal",
        value: TextureTools.buildPalette(
          EFFECT_DEFAULTS["dithering-plus-color-palettes"].pal.options![properties.pal as string].value as string[],
        ),
      },
    ],
    [properties],
  );

  return <Effect name="DitheringPlusColorPalettes" shader={ditheringPlusColorPalettesShader} uniforms={uniforms} />;
};

export default DitheringPlusColorPalettesEffect;
