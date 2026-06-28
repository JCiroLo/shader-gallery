export default `
uniform float noise_scale;
uniform float vignette_strength;
uniform float sepia_strength;
uniform float contrast;
uniform float glow_range;
uniform float glow_strength;
uniform float glow_falloff;
uniform float dirt_strength;
uniform float dirt_scale;
uniform vec2 resolution;

float rand(vec2 co) {
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 i = floor(p), f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
        mix(rand(i), rand(i + vec2(1.0, 0.0)), f.x),
        mix(rand(i + vec2(0.0, 1.0)), rand(i + vec2(1.0, 1.0)), f.x),
        f.y
    );
}

float fbm(vec2 p) {
    return noise(p) * 0.5 + noise(p * 2.1) * 0.25 + noise(p * 4.3) * 0.125 + noise(p * 8.7) * 0.063;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec4 tex = inputColor;
    if (tex.a < 0.1) {
        outputColor = vec4(0.0);
    } else {
        vec2 px = 1.0 / resolution;
        float closest = 1.0;
        vec3 nearestLineColor = vec3(0.0);
        float ga = 2.399963;
        for (int i = 0; i < 16; i++) {
            float r = sqrt(float(i + 1) / 32.0);
            float angle = float(i) * ga;
            float nOffset = fbm(uv * 10.0 + vec2(float(i) * 0.3)) * 1.5;
            vec2 offset = vec2(cos(angle + nOffset), sin(angle + nOffset)) * r * px * glow_range;
            vec4 s = texture2D(inputBuffer, uv + offset);
            if (s.a > 0.1) {
                float b = dot(s.rgb, vec3(0.333));
                if (b < 0.45) {
                    if (r < closest) {
                        closest = r;
                        nearestLineColor = s.rgb;
                    }
                }
            }
        }
        float glowAmount = pow(1.0 - closest, glow_falloff) * glow_strength;
        float glowNoise = fbm(uv * 15.0 + vec2(2.3, 5.1));
        glowAmount *= (0.6 + glowNoise * 0.8);
        glowAmount = clamp(glowAmount, 0.0, 1.0);
        vec3 col = tex.rgb;
        col = mix(col, nearestLineColor, glowAmount);
        float dirt1 = fbm(uv * dirt_scale);
        float dirt2 = fbm(uv * dirt_scale * 2.3 + vec2(4.1, 2.7));
        float dirt3 = fbm(uv * dirt_scale * 0.5 + vec2(1.2, 8.3));
        float dirt = dirt1 * dirt2 * dirt3;
        col -= pow(dirt, 1.5) * dirt_strength;
        col = (col - 0.5) * contrast + 0.5;
        float gray = dot(col, vec3(0.299, 0.587, 0.114));
        vec3 sepia = vec3(gray) * vec3(1.12, 0.95, 0.70);
        col = mix(col, sepia, sepia_strength);
        float n  = fbm(uv * noise_scale);
        float n2 = fbm(uv * noise_scale * 2.5 + vec2(3.7, 1.9));
        col += (n  - 0.5) * 0.05;
        col += (n2 - 0.5) * 0.025;
        float lines = sin(uv.y * 500.0) * 0.015 + sin(uv.y * 180.0) * 0.007;
        col += lines;
        vec2 e = uv * (1.0 - uv);
        float vignette = pow(clamp(e.x * e.y * 16.0, 0.0, 1.0), vignette_strength);
        col *= vignette;
        outputColor = vec4(col, tex.a);
    }
}
`;
