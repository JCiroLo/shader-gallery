export default `
  uniform float uTime;
  uniform float uIntensity;

  void mainUv(inout vec2 uv) {
    // Distorsión sinusoidal de las coordenadas UV
    uv.y += sin(uv.x * 10.0 + uTime) * uIntensity;
    uv.x += cos(uv.y * 10.0 + uTime) * uIntensity;
  }
`;
