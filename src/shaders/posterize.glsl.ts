export default `
  uniform vec2 resolution;
  uniform float noise_scale;
  uniform float color_levels;
  uniform float dither_strength;

  float random(vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
      vec2 pixelCoord = (uv * resolution) / noise_scale;
      float noise = random(floor(pixelCoord));
      
      vec3 ditheredColor = inputColor.rgb + (noise - 0.5) * dither_strength;
      
      vec3 quantizedColor = floor(ditheredColor * color_levels) / color_levels;
      
      outputColor = vec4(quantizedColor, inputColor.a);
  }
`;
