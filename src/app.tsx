import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { EffectComposer, Vignette, Noise } from "@react-three/postprocessing";
import ImagePreview from "@/components/image-preview";
import ShaderSettingsPanel from "@/components/shader-settings-panel";
import TintEffect from "@/effects/tint-effect";
import WarpEffect from "@/effects/warp-effect";
import { CrtEffect } from "@/effects/crt-effect";
import { LensArrayEffect } from "@/effects/lens-array-effect";
import MetalCoreEffect from "@/effects/metal-core";
import Posterizer from "@/effects/posterizer";
import CrtVhsEffect from "@/effects/crt-vhs-effect";
import useEffectsStore from "@/stores/effects-store";
import useSettingsStore from "@/stores/settings-store";
import { OPTIONS_WIDTH } from "@/lib/constants";
import type { Effect } from "@/types";

function App() {
  const { properties } = useEffectsStore();
  const { effect, image } = useSettingsStore();

  const effects: Record<Effect, { component: any; props: any }> = {
    none: { component: null, props: null },
    tint: { component: TintEffect, props: properties.tint },
    warp: { component: WarpEffect, props: properties.warp },
    "crt-vhs": { component: CrtVhsEffect, props: properties["crt-vhs"] },
    crt: { component: CrtEffect, props: properties.crt },
    "lens-array": { component: LensArrayEffect, props: properties["lens-array"] },
    "metal-core": { component: MetalCoreEffect, props: properties["metal-core"] },
    posterize: { component: Posterizer, props: properties.posterize },
  };

  const CurrentEffect = effects[effect].component;

  return (
    <div style={{ width: "100vw", height: "100dvh", background: "#111" }}>
      <Canvas dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
        <Suspense fallback={null}>
          <ImagePreview src={image} />

          <EffectComposer>
            <>
              <Noise opacity={0.05} />
              <Vignette eskil={false} offset={0.1} darkness={0.5} />

              {effect !== "none" && <CurrentEffect {...effects[effect].props} />}
            </>
          </EffectComposer>
        </Suspense>
      </Canvas>

      <div className="ui-overlay" style={{ width: OPTIONS_WIDTH }}>
        <h1>Shader Gallery</h1>
        <ShaderSettingsPanel />
      </div>
    </div>
  );
}

export default App;
