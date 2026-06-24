import { forwardRef, useMemo } from "react";
import { Uniform, Color, type Object3D } from "three";
import { Effect } from "postprocessing";
import tintFragmentShader from "../shaders/tint.glsl.js";

type TintEffectProps = {
  color?: string;
  opacity?: number;
};

class TintEffectImpl extends Effect {
  constructor({ color = "#ff9900", opacity = 0.5 } = {}) {
    super("TintEffect", tintFragmentShader, {
      uniforms: new Map<string, Uniform>([
        ["uColor", new Uniform(new Color(color))],
        ["uOpacity", new Uniform(opacity)],
      ]),
    });
  }
}

const TintEffect = forwardRef<Object3D, TintEffectProps>((props, ref) => {
  const effect = useMemo(() => new TintEffectImpl(props), [props]);

  return <primitive object={effect} ref={ref} />;
});

export default TintEffect;
