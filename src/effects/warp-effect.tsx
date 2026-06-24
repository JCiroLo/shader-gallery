import { forwardRef, useMemo } from "react";
import { Effect } from "postprocessing";
import { Uniform, type Object3D, type WebGLRenderer, type WebGLRenderTarget } from "three";
import warpShader from "../shaders/warp.glsl.js";

type WarpEffectProps = {
  intensity?: number;
};

class WarpEffectImpl extends Effect {
  private time: number;

  constructor({ intensity = 0.02 } = {}) {
    super("WarpEffect", warpShader, {
      uniforms: new Map([
        ["uTime", new Uniform(0)],
        ["uIntensity", new Uniform(intensity)],
      ]),
    });

    this.time = 0;
  }

  update(_: WebGLRenderer, __: WebGLRenderTarget, deltaTime: number) {
    this.time += deltaTime;
    this.uniforms.get("uTime")!.value = this.time;
  }
}

const WarpEffect = forwardRef<Object3D, WarpEffectProps>((props, ref) => {
  const effect = useMemo(() => new WarpEffectImpl(props), [props]);

  return <primitive object={effect} ref={ref} />;
});

export default WarpEffect;
