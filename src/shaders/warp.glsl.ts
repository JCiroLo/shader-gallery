export default `
  uniform float time;
  uniform float intensity;

  void mainUv(inout vec2 uv) {
    uv.y += sin(uv.x * 10.0 + time) * intensity;
    uv.x += cos(uv.y * 10.0 + time) * intensity;
  }
`;
