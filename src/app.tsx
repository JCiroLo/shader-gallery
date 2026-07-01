import { Suspense } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { useShallow } from "zustand/shallow";
import { EffectComposer } from "@react-three/postprocessing";
import AppActions from "@/components/app-actions";
import SceneActions from "@/components/scene-actions";
import ImagePreview from "@/components/image-preview";
import EffectsPanel from "@/components/effects-panel";
import useSettingsStore from "@/stores/settings-store";
import useEffectsStore from "@/stores/effects-store";
import useRefsStore from "@/stores/refs-store";
import type { Effect } from "@/types";

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

const effects: Record<Effect, React.ComponentType> = {
  "analog-monochrome-monitor": AnalogMonochromeMonitor,
  bloom: BloomEffect,
  "crt-vhs": CrtVhsEffect,
  crt: CrtEffect,
  "dithering-plus-color-palettes": DitheringPlusColorPalettesEffect,
  "film-grain": FilmGrainEffect,
  "lens-array": LensArrayEffect,
  "metal-core": MetalCoreEffect,
  posterize: PosterizeEffect,
  ps1: Ps1Effect,
  sepia: SepiaEffect,
  "simple-crt-vhs": SimpleCrtVhsEffect,
  tint: TintEffect,
  warp: WarpEffect,
};

function App() {
  const { setCamera } = useRefsStore(useShallow((state) => ({ setCamera: state.setCamera })));
  const { image, tab, effectsPanelSize } = useSettingsStore(
    useShallow((state) => ({ image: state.image, tab: state.tab, effectsPanelSize: state.effectsPanelSize })),
  );
  const { queue } = useEffectsStore(useShallow((state) => ({ queue: state.queue })));

  return (
    <main
      style={{
        "--settings-panel-width": `${effectsPanelSize.width}px`,
        "--settings-panel-height": `${effectsPanelSize.height[tab !== "effects" ? "active" : "default"]}px`,
      }}
    >
      <h1>Shader Gallery</h1>
      <div className="canvas-wrapper">
        <Canvas dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
          <OrbitControls
            ref={(controls) => setCamera(controls)}
            makeDefault
            enableRotate={false}
            enableZoom={true}
            maxPolarAngle={Math.PI / 2}
            minPolarAngle={Math.PI / 2}
            mouseButtons={{
              LEFT: THREE.MOUSE.PAN,
              MIDDLE: THREE.MOUSE.DOLLY,
            }}
          />
          <Suspense fallback={null}>
            <ImagePreview src={image} />
            <EffectComposer>
              {Array.from(queue).map((effect) => {
                const Effect = effects[effect];

                return <Effect key={effect} />;
              })}
            </EffectComposer>
          </Suspense>
        </Canvas>
        <SceneActions />
        <AppActions />
      </div>
      <EffectsPanel />
    </main>
  );
}

export default App;
