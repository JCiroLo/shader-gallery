import { forwardRef, useMemo } from "react";
import * as THREE from "three";
import { Effect } from "postprocessing";
import lensArrayShader from "../shaders/lens-array.glsl";

type LensArrayEffectProps = {
  gridSize?: number;
  curvature?: number;
  gridAngle?: number;
  shape?: number;
  scale?: [number, number];
  stagger?: boolean;
};

class LensArrayEffectImpl extends Effect {
  constructor({
    gridSize = 50.0,
    curvature = 0.25,
    gridAngle = 0.0,
    shape = 0, // 0: circle, 1: diamond, 2: square
    scale = [1, 1],
    stagger = true,
  } = {}) {
    super("LensArrayEffect", lensArrayShader, {
      uniforms: new Map<string, THREE.Uniform<unknown>>([
        ["gridSize", new THREE.Uniform(gridSize)],
        ["curvature", new THREE.Uniform(curvature)],
        ["gridAngle", new THREE.Uniform(gridAngle)],
        ["uShape", new THREE.Uniform(shape)],
        ["uScale", new THREE.Uniform(new THREE.Vector2(scale[0], scale[1]))],
        ["uStagger", new THREE.Uniform(stagger ? 1.0 : 0.0)],
      ]),
    });
  }
}

export const LensArrayEffect = forwardRef<THREE.Object3D, LensArrayEffectProps>(
  (props, ref) => {
    const effect = useMemo(() => new LensArrayEffectImpl(props), [props]);

    return <primitive ref={ref} object={effect} dispose={null} />;
  }
);
