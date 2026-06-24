import { forwardRef, useMemo } from "react";
import { Effect } from "postprocessing";
import * as THREE from "three";
import posterizerShader from "../shaders/posterizer.glsl";

type PosterizerProps = {
  noiseScale?: number;
  colorLevels?: number;
  ditherStrength?: number;
};

class PosterizerImpl extends Effect {
  constructor({ noiseScale = 1.0, colorLevels = 4, ditherStrength = 0.5 }) {
    super("Posterizer", posterizerShader, {
      uniforms: new Map<string, THREE.Uniform<unknown>>([
        ["uResolution", new THREE.Uniform(new THREE.Vector2(0, 0))],
        ["uNoiseScale", new THREE.Uniform(noiseScale)],
        ["uColorLevels", new THREE.Uniform(colorLevels)],
        ["uDitherStrength", new THREE.Uniform(ditherStrength)],
      ]),
    });
  }

  update(_: THREE.WebGLRenderer, inputBuffer: THREE.WebGLRenderTarget) {
    this.uniforms.get("uResolution")!.value = new THREE.Vector2(
      inputBuffer.width,
      inputBuffer.height
    );
  }
}
const Posterizer = forwardRef<THREE.Object3D, PosterizerProps>((props, ref) => {
  const effect = useMemo(() => new PosterizerImpl(props), [props]);

  return <primitive ref={ref} object={effect} dispose={null} />;
});

export default Posterizer;
