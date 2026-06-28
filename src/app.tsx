import { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import ImagePreview from "@/components/image-preview";
import EffectQueue from "@/components/effect-queue";
import ShaderSettingsPanel from "@/components/shader-settings-panel";
import useSettingsStore from "@/stores/settings-store";

function App() {
  const { image } = useSettingsStore();

  return (
    <div style={{ width: "100vw", height: "100dvh", background: "#111" }}>
      <Canvas dpr={[1, 2]} gl={{ preserveDrawingBuffer: true }}>
        <Suspense fallback={null}>
          <ImagePreview src={image} />
          <EffectQueue />
        </Suspense>
      </Canvas>
      <div className="ui-overlay">
        <h1>Shader Gallery</h1>
        <ShaderSettingsPanel />
      </div>
    </div>
  );
}

export default App;
