import { forwardRef, useMemo } from "react";
import * as THREE from "three";
import { Effect } from "postprocessing";
import crtVhsShader from "../shaders/crt-vhs.glsl";

type CrtVhsEffectProps = {
  scanlinesOpacity?: number;
  scanlinesWidth?: number;
  grilleOpacity?: number;
  pixelate?: boolean;
  roll?: boolean;
  rollSpeed?: number;
  rollSize?: number;
  rollVariation?: number;
  distortIntensity?: number;
  noiseOpacity?: number;
  noiseSpeed?: number;
  staticNoiseIntensity?: number;
  aberration?: number;
  brightness?: number;
  discolor?: boolean;
  warpAmount?: number;
  clipWarp?: boolean;
  vignetteIntensity?: number;
  vignetteOpacity?: number;
};

class CrtVhsEffectImpl extends Effect {
  private time: number;

  constructor({
    scanlinesOpacity = 0.4,
    scanlinesWidth = 0.25,
    grilleOpacity = 0.3,
    pixelate = true,
    roll = true,
    rollSpeed = 8.0,
    rollSize = 15.0,
    rollVariation = 1.8,
    distortIntensity = 0.05,
    noiseOpacity = 0.4,
    noiseSpeed = 5.0,
    staticNoiseIntensity = 0.06,
    aberration = 0.03,
    brightness = 1.4,
    discolor = true,
    warpAmount = 1.0,
    clipWarp = false,
    vignetteIntensity = 0.4,
    vignetteOpacity = 0.5,
  }: CrtVhsEffectProps = {}) {
    super("CrtVhsEffect", crtVhsShader, {
      uniforms: new Map<string, THREE.Uniform<unknown>>([
        ["time", new THREE.Uniform(0)],
        ["resolution", new THREE.Uniform([640, 480])],
        ["scanlines_opacity", new THREE.Uniform(scanlinesOpacity)],
        ["scanlines_width", new THREE.Uniform(scanlinesWidth)],
        ["grille_opacity", new THREE.Uniform(grilleOpacity)],
        ["pixelate", new THREE.Uniform(pixelate)],
        ["roll", new THREE.Uniform(roll)],
        ["roll_speed", new THREE.Uniform(rollSpeed)],
        ["roll_size", new THREE.Uniform(rollSize)],
        ["roll_variation", new THREE.Uniform(rollVariation)],
        ["distort_intensity", new THREE.Uniform(distortIntensity)],
        ["noise_opacity", new THREE.Uniform(noiseOpacity)],
        ["noise_speed", new THREE.Uniform(noiseSpeed)],
        ["static_noise_intensity", new THREE.Uniform(staticNoiseIntensity)],
        ["aberration", new THREE.Uniform(aberration)],
        ["brightness", new THREE.Uniform(brightness)],
        ["discolor", new THREE.Uniform(discolor)],
        ["warp_amount", new THREE.Uniform(warpAmount)],
        ["clip_warp", new THREE.Uniform(clipWarp)],
        ["vignette_intensity", new THREE.Uniform(vignetteIntensity)],
        ["vignette_opacity", new THREE.Uniform(vignetteOpacity)],
      ]),
    });

    this.time = 0;
  }

  update(
    _: THREE.WebGLRenderer,
    inputBuffer: THREE.WebGLRenderTarget,
    deltaTime: number
  ): void {
    this.time += deltaTime;
    this.uniforms.get("time")!.value = this.time;
    this.uniforms.get("resolution")!.value = [
      inputBuffer.width,
      inputBuffer.height,
    ];
  }
}

const CrtVhsEffect = forwardRef<THREE.Object3D, CrtVhsEffectProps>(
  (props, ref) => {
    const effect = useMemo(() => new CrtVhsEffectImpl(props), [props]);

    return <primitive ref={ref} object={effect} dispose={null} />;
  }
);

export default CrtVhsEffect;
