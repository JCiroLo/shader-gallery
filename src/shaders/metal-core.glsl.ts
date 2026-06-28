export default `
  uniform float exposure;
  uniform float contrast;
  uniform float saturation;

  uniform bool enablePixelate;
  uniform float pixelFactor;

  uniform bool enablePosterize;
  uniform float colorLevels;
  uniform float ditherStrength;

  uniform float chromAberration;
  uniform float vignetteStrength;
  uniform float grainStrength;

  uniform vec3 tintColor;
  uniform float tintStrength;

  uniform vec2 resolution;
  uniform float time;

  float bayer4x4(vec2 p){
      int x = int(mod(p.x, 4.0));
      int y = int(mod(p.y, 4.0));
      int m[16] = int[16](
          0,  8,  2, 10,
          12,  4, 14,  6,
          3, 11,  1,  9,
          15,  7, 13,  5
      );
      return (float(m[y*4 + x]) + 0.5) / 16.0;
  }

  vec3 to_hsv(vec3 c){
      float cmax = max(c.r, max(c.g, c.b));
      float cmin = min(c.r, min(c.g, c.b));
      float d = cmax - cmin;
      float h = 0.0;

      if(d > 1e-5){
          if(cmax == c.r)       h = mod((c.g - c.b) / d, 6.0);
          else if(cmax == c.g)  h = (c.b - c.r) / d + 2.0;
          else                  h = (c.r - c.g) / d + 4.0;

          h /= 6.0;
          if(h < 0.0) h += 1.0;
      }

      float s = cmax <= 1e-5 ? 0.0 : d / cmax;
      return vec3(h, s, cmax);
  }

  vec3 to_rgb(vec3 hsv){
      float h = hsv.x * 6.0;
      float s = hsv.y;
      float v = hsv.z;

      int i = int(floor(h));
      float f = h - float(i);

      float p = v * (1.0 - s);
      float q = v * (1.0 - s * f);
      float t = v * (1.0 - s * (1.0 - f));

      if(i == 0) return vec3(v, t, p);
      if(i == 1) return vec3(q, v, p);
      if(i == 2) return vec3(p, v, t);
      if(i == 3) return vec3(p, q, v);
      if(i == 4) return vec3(t, p, v);
      return vec3(v, p, q);
  }

  vec3 adjust(vec3 c, float contrast, float saturation){
      c = (c - 0.5) * contrast + 0.5;
      vec3 hsv = to_hsv(c);
      hsv.y *= saturation;
      return clamp(to_rgb(hsv), 0.0, 1.0);
  }

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outColor){
      vec2 px = 1.0 / resolution;
      if(resolution.x <= 0.0) {
          px = vec2(1.0) / vec2(textureSize(inputBuffer, 0));
      }

      vec2 u = uv;

      if(enablePixelate){
          vec2 stepUv = px * pixelFactor;
          u = floor(uv / stepUv) * stepUv + stepUv * 0.5;
      }

      vec2 center = vec2(0.5);
      vec2 dir = u - center;
      float dist = length(dir);
      float ca = chromAberration * dist * dist;

      vec3 col;
      col.r = texture(inputBuffer, u + dir * ca).r;
      col.g = texture(inputBuffer, u).g;
      col.b = texture(inputBuffer, u - dir * ca).b;

      col *= exposure;

      col = mix(col, col * tintColor, tintStrength);

      if(enablePosterize){
          vec2 frag = floor(uv / px);
          float b = bayer4x4(frag);
          vec3 q = floor(col * colorLevels + b * ditherStrength);
          col = q / (colorLevels - 1.0);
      }

      col = adjust(col, contrast, saturation);

      float vignette = smoothstep(0.5, 0.9, dist) * vignetteStrength;
      col *= clamp(1.0 - vignette, 0.0, 1.0);

      float n = fract(sin(dot(floor(uv/px), vec2(12.9898, 78.233)) + time * 37.0) * 43758.5453);
      col += (n - 0.5) * (px.x + px.y) * 2.0 * grainStrength;

      outColor = vec4(clamp(col, 0.0, 1.0), 1.0);
  }
`;
