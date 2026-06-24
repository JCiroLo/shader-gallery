export default `
  uniform vec2 uResolution;
  uniform float uNoiseScale;
  uniform float uColorLevels;
  uniform float uDitherStrength;

  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
      vec2 pixelCoord = (uv * uResolution) / uNoiseScale;
      float noise = random(floor(pixelCoord));
      
      vec3 ditheredColor = inputColor.rgb + (noise - 0.5) * uDitherStrength;
      
      vec3 quantizedColor = floor(ditheredColor * uColorLevels) / uColorLevels;
      
      outputColor = vec4(quantizedColor, inputColor.a);
  }
`;
