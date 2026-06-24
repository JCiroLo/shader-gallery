import { forwardRef, useMemo } from "react";
import * as THREE from "three";
import { Effect } from "postprocessing";
import metalCoreShader from "../shaders/metal-core.glsl";

type MetalCoreEffectProps = {
  exposure?: number;
  contrast?: number;
  saturation?: number;
  enablePixelate?: boolean;
  pixelFactor?: number;
  enablePosterize?: boolean;
  colorLevels?: number;
  ditherStrength?: number;
  chromAberration?: number;
  vignetteStrength?: number;
  grainStrength?: number;
  tintColor?: THREE.Vector3;
  tintStrength?: number;
  viewportSize?: THREE.Vector2;
  time?: number;
};

class MetalCoreEffectImpl extends Effect {
  private time: number;

  constructor({
    exposure = 1.0,
    contrast = 1.05,
    saturation = 0.9,
    enablePixelate = true,
    pixelFactor = 2.0,
    enablePosterize = true,
    colorLevels = 8.0,
    ditherStrength = 0.35,
    chromAberration = 0.35,
    vignetteStrength = 1.0,
    grainStrength = 0.2,
    tintColor = new THREE.Vector3(0.95, 1.03, 0.9),
    tintStrength = 0.15,
    viewportSize = new THREE.Vector2(0, 0),
  } = {}) {
    super("MetalCoreEffect", metalCoreShader, {
      uniforms: new Map<string, THREE.Uniform<unknown>>([
        ["exposure", new THREE.Uniform(exposure)],
        ["contrast", new THREE.Uniform(contrast)],
        ["saturation", new THREE.Uniform(saturation)],
        ["enablePixelate", new THREE.Uniform(enablePixelate)],
        ["pixelFactor", new THREE.Uniform(pixelFactor)],
        ["enablePosterize", new THREE.Uniform(enablePosterize)],
        ["colorLevels", new THREE.Uniform(colorLevels)],
        ["ditherStrength", new THREE.Uniform(ditherStrength)],
        ["chromAberration", new THREE.Uniform(chromAberration)],
        ["vignetteStrength", new THREE.Uniform(vignetteStrength)],
        ["grainStrength", new THREE.Uniform(grainStrength)],
        ["tintColor", new THREE.Uniform(tintColor)],
        ["tintStrength", new THREE.Uniform(tintStrength)],
        ["viewportSize", new THREE.Uniform(viewportSize)],
        ["time", new THREE.Uniform(0)],
      ]),
    });

    this.time = 0;
  }

  update(
    renderer: THREE.WebGLRenderer,
    inputBuffer: THREE.WebGLRenderTarget,
    deltaTime: number
  ) {
    this.time += deltaTime;
    this.uniforms.get("time")!.value = this.time;
    this.uniforms.get("viewportSize")!.value = new THREE.Vector2(
      inputBuffer.width,
      inputBuffer.height
    );
  }
}

const MetalCoreEffect = forwardRef<THREE.Object3D, MetalCoreEffectProps>(
  (props, ref) => {
    const effect = useMemo(() => new MetalCoreEffectImpl(props), [props]);

    return <primitive ref={ref} object={effect} dispose={null} />;
  }
);

export default MetalCoreEffect;
