export default `
  uniform float grid_size;
  uniform float curvature;
  uniform float grid_angle;
  uniform int shape;      
  uniform vec2 scale;     
  uniform float stagger;  

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
      float c = cos(grid_angle);
      float s = sin(grid_angle);
      mat2 rot = mat2(c, -s, s, c);
      
      vec2 aspectUV = uv;
      
      vec2 gridUV = aspectUV * grid_size;
      
      float row = floor(gridUV.y);
      
      if (stagger > 0.5 && mod(row, 2.0) > 0.0) {
          gridUV.x += 0.5;
      }
      
      vec2 cellUV = fract(gridUV) - 0.5;
      vec2 shapedUV = cellUV / scale; 
      
      float dist = 0.0;
      
      if (shape == 0) {
          dist = length(shapedUV);
      } else if (shape == 1) {
          dist = abs(shapedUV.x) + abs(shapedUV.y);
      } else if (shape == 2) {
          dist = max(abs(shapedUV.x), abs(shapedUV.y));
      }
      
      if (dist < 0.5) {
          float z = sqrt(0.5 * 0.5 - dist * dist);
          vec3 normal = normalize(vec3(shapedUV.x, shapedUV.y, z));
          
          vec2 distortedUV = uv + normal.xy * curvature;
          outputColor = texture2D(inputBuffer, distortedUV);
          
          float shading = dot(normal, vec3(0.0, 0.0, 1.0));
          outputColor.rgb *= smoothstep(0.0, 1.2, shading); 
      } else {
          outputColor = vec4(0.0, 0.0, 0.0, 1.0);
      }
  }
`;
