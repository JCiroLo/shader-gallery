export default `
uniform float resolution_x;
uniform float resolution_y;
uniform float color_bit_depth;
uniform float dither_strength;
uniform float jitter_amount;
uniform float jitter_speed;
uniform float jitter_frequency;
uniform float chromatic_aberration_strength;
uniform float vignette_strength;
uniform float vignette_radius;
uniform float time;

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

vec2 psx_jitter(vec2 uv) {
    float t = floor(time * jitter_speed * 8.0) / 8.0;
    float h_shake = hash(vec2(floor(uv.y * jitter_frequency), t)) - 0.5;
    h_shake *= jitter_amount * 0.75;
    float v_shake = hash(vec2(floor(uv.x * jitter_frequency * 0.4), t)) - 0.5;
    v_shake *= jitter_amount * 0.35;
    float micro = hash(uv * 600.0 + t) - 0.5;
    micro *= jitter_amount * 0.1;
    return uv + vec2(h_shake + micro, v_shake + micro);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 px = vec2(1.0 / resolution_x, 1.0 / resolution_y);
    vec2 snapped = floor(uv / px) * px + px * 0.5;
    snapped = psx_jitter(snapped);

    vec3 col;
    if (chromatic_aberration_strength > 0.001) {
        vec2 offset = (snapped - 0.5) * chromatic_aberration_strength;
        col.r = texture2D(inputBuffer, snapped + offset).r;
        col.g = texture2D(inputBuffer, snapped).g;
        col.b = texture2D(inputBuffer, snapped - offset).b;
    } else {
        col = texture2D(inputBuffer, snapped).rgb;
    }

    float levels = pow(2.0, color_bit_depth);
    col = floor(col * levels) / levels;

    if (vignette_strength > 0.0) {
        float dist = distance(uv, vec2(0.5));
        float vignette = 1.0 - vignette_strength * smoothstep(vignette_radius * 0.5, vignette_radius, dist);
        col *= vignette;
    }

    if (dither_strength > 0.0) {
        float noise = hash(uv * 80.0 + floor(time * 50.0));
        col += (noise - 0.5) * dither_strength;
    }

    outputColor = vec4(col, 1.0);
}
`;
