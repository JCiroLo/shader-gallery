import { forwardRef, useMemo } from "react";
import * as THREE from "three";
import { Effect } from "postprocessing";
import crtShader from "../shaders/crt.glsl";
import type { CrtEffect as CrtEffectType } from "@/types";

type CrtEffectProps = CrtEffectType;

class CrtEffectImpl extends Effect {
  constructor({ pixelSize = 8.0 } = {}) {
    super("CrtEffect", crtShader, {
      uniforms: new Map<string, THREE.Uniform<unknown>>([
        ["pixelSize", new THREE.Uniform(pixelSize)],
        ["tSize", new THREE.Uniform(new THREE.Vector2(0, 0))],
      ]),
    });
  }

  update(_: THREE.WebGLRenderer, inputBuffer: THREE.WebGLRenderTarget) {
    this.uniforms.get("tSize")!.value = new THREE.Vector2(inputBuffer.width, inputBuffer.height);
  }
}

export const CrtEffect = forwardRef<THREE.Object3D, CrtEffectProps>((props, ref) => {
  const effect = useMemo(() => new CrtEffectImpl(props), [props]);

  return <primitive ref={ref} object={effect} dispose={null} />;
});
