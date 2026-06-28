import { EffectComposer } from "@react-three/postprocessing";
import AnalogMonochromeMonitor from "@/effects/analog-monochrome-monitor-effect";
import BloomEffect from "@/effects/bloom-effect";
import CrtEffect from "@/effects/crt-effect";
import CrtVhsEffect from "@/effects/crt-vhs-effect";
import DitheringPlusColorPalettesEffect from "@/effects/dithering-plus-color-palettes";
import FilmGrainEffect from "@/effects/film-grain-effect";
import LensArrayEffect from "@/effects/lens-array-effect";
import MetalCoreEffect from "@/effects/metal-core";
import PosterizeEffect from "@/effects/posterize";
import Ps1Effect from "@/effects/ps1-effect";
import SepiaEffect from "@/effects/sepia-effect";
import SimpleCrtVhsEffect from "@/effects/simple-crt-vhs-effect";
import TintEffect from "@/effects/tint-effect";
import WarpEffect from "@/effects/warp-effect";
import useSettingsStore from "@/stores/settings-store";
import type { Effect } from "@/types";

const EffectQueue = () => {
  const { effect } = useSettingsStore();

  const effects: Record<Effect, React.ComponentType | null> = {
    "analog-monochrome-monitor": AnalogMonochromeMonitor,
    bloom: BloomEffect,
    "crt-vhs": CrtVhsEffect,
    crt: CrtEffect,
    "dithering-plus-color-palettes": DitheringPlusColorPalettesEffect,
    "film-grain": FilmGrainEffect,
    "lens-array": LensArrayEffect,
    "metal-core": MetalCoreEffect,
    none: null,
    posterize: PosterizeEffect,
    ps1: Ps1Effect,
    sepia: SepiaEffect,
    "simple-crt-vhs": SimpleCrtVhsEffect,
    tint: TintEffect,
    warp: WarpEffect,
  };

  const CurrentEffect = effects[effect];

  return (
    <EffectComposer>
      <>{effect !== "none" && CurrentEffect && <CurrentEffect />}</>
    </EffectComposer>
  );
};

export default EffectQueue;
