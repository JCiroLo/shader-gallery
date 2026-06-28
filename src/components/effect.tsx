import { forwardRef, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Effect as PostProcessingEffect } from "postprocessing";

type EffectUniform = {
  name: string;
  value: number | boolean | THREE.Vector2 | THREE.Vector3 | THREE.Color | THREE.DataTexture | THREE.Texture;
};

type EffectProps = {
  name: string;
  shader: string;
  uniforms: EffectUniform[];
};

class EffectImpl extends PostProcessingEffect {
  private time: number;

  constructor(name: string, shader: string, uniforms: EffectUniform[]) {
    super(name, shader, {
      uniforms: new Map<string, THREE.Uniform>(uniforms.map(({ name, value }) => [name, new THREE.Uniform(value)])),
    });

    this.time = 0;
  }

  initialize(renderer: THREE.WebGLRenderer, alpha: boolean, frameBufferType: number): void {
    super.initialize(renderer, alpha, frameBufferType);

    this.time = 0;

    this.uniforms.set("resolution", new THREE.Uniform(new THREE.Vector2(0, 0)));
    this.uniforms.set("time", new THREE.Uniform(0));
  }

  update(_: THREE.WebGLRenderer, inputBuffer: THREE.WebGLRenderTarget, deltaTime: number) {
    this.time += deltaTime;

    this.uniforms.get("resolution")!.value = new THREE.Vector2(inputBuffer.width, inputBuffer.height);
    this.uniforms.get("time")!.value = this.time;
  }
}

const Effect = forwardRef<THREE.Object3D, EffectProps>((props, ref) => {
  const effect = useMemo(() => new EffectImpl(props.name, props.shader, props.uniforms), [props.name, props.shader]);

  useEffect(() => {
    props.uniforms.forEach(({ name, value }) => {
      const uniform = effect.uniforms.get(name);

      if (uniform) {
        uniform.value = value;
      }
    });
  }, [effect, props.uniforms]);

  // TODO: EffectImpl is being created every render when uniforms change, optimize it
  return <primitive ref={ref} object={effect} dispose={null} />;
});

export default Effect;
