import { useMemo } from "react";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";
import analogMonochromeMonitorShader from "@/shaders/analog-monochrome-monitor.glsl";
import Effect from "@/components/effect";
import useEffectsStore from "@/stores/effects-store";

const AnalogMonochromeMonitor = () => {
  const tiledTexture = useTexture("/textures/monitor-pixel.png", (texture) => {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.needsUpdate = true;
  });

  const properties = useEffectsStore((state) => state.properties["analog-monochrome-monitor"]);

  const uniforms = useMemo(
    () => [
      { name: "opacity", value: properties.opacity as number },
      { name: "pixel_size", value: properties.pixelSize as number },
      { name: "greyscale", value: properties.greyscale as boolean },
      { name: "contrast", value: properties.contrast as number },
      { name: "pixel_colors", value: new THREE.Color(properties.pixelColors as string) },
      { name: "background_color", value: new THREE.Color(properties.backgroundColor as string) },
      { name: "tiledtexture", value: tiledTexture },
    ],
    [properties, tiledTexture],
  );

  return <Effect name="AnalogMonochromeMonitor" shader={analogMonochromeMonitorShader} uniforms={uniforms} />;
};

export default AnalogMonochromeMonitor;
