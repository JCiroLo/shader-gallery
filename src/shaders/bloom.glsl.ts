export default `
uniform float strength;
uniform float radius;
uniform float threshold;
uniform float softness;
uniform float saturation_weight;
uniform vec2 resolution;

float luminance(vec3 c) {
    return dot(c, vec3(0.2126, 0.7152, 0.0722));
}

float get_saturation(vec3 c) {
    float mx = max(c.r, max(c.g, c.b));
    float mn = min(c.r, min(c.g, c.b));
    return mx > 0.001 ? (mx - mn) / mx : 0.0;
}

float glow_mask(vec3 col) {
    float lum = luminance(col);
    float sat = get_saturation(col);
    float effective = lum * (1.0 + sat * saturation_weight);
    float knee = max(threshold * softness, 0.001);
    return smoothstep(threshold - knee, threshold + knee, effective);
}

vec3 screen_blend(vec3 a, vec3 b) {
    return 1.0 - (1.0 - a) * (1.0 - b);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 texel = 1.0 / resolution;
    vec3 bloom = vec3(0.0);
    float weight_total = 0.0;

    const int SAMPLES = 64;
    const float GA = 2.399963;

    for (int i = 0; i < SAMPLES; i++) {
        float t = float(i) / float(SAMPLES);
        float r = sqrt(t) * radius;
        float angle = float(i) * GA;

        vec2 offset = vec2(cos(angle), sin(angle)) * r * texel;
        vec3 s = texture2D(inputBuffer, uv + offset).rgb;

        float dist_w = exp(-3.0 * t);
        float glow_w = glow_mask(s);

        bloom += s * glow_w * dist_w;
        weight_total += dist_w;
    }

    bloom = bloom / max(weight_total, 0.001) * strength;
    outputColor = vec4(screen_blend(inputColor.rgb, bloom), inputColor.a);
}
`;
