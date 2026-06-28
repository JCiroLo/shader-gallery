export default `
uniform float rows;
uniform float cols;
uniform sampler2D pal;
uniform float dither_size;
uniform float dither_amount;
uniform vec2 resolution;

const float lin = 0.454545;
const float srgb_g = 2.2;

float lerp_f(float val1, float val2, float mul) {
    return val1 + (val2 - val1) * clamp(mul, 0.0, 1.0);
}

vec3 get_srgb(vec3 xyz) {
    return vec3(pow(xyz.x, srgb_g), pow(xyz.y, srgb_g), pow(xyz.z, srgb_g));
}

vec3 get_linear(vec3 xyz) {
    return vec3(pow(xyz.x, lin), pow(xyz.y, lin), pow(xyz.z, lin));
}

float PickColor(float x, float y) {
    x = mod(x, 1.0);
    y = mod(y, 1.0);
    x = clamp(floor(x * rows) / (cols * rows), 0.0, 250.0 / 256.0);
    y = clamp(floor(y * cols) / cols, 0.0, 250.0 / 256.0);
    return y + x;
}

vec3 dither(vec3 color_in, vec2 uv, vec2 screen_size) {
    float dith = max(1.0, dither_size);
    float d = rows * cols;
    float f = 0.25 / rows;

    color_in = get_linear(color_in);

    float a = floor(mod(uv.x * screen_size.x / dith, 2.0));
    float b = floor(mod(uv.y * screen_size.y / dith, 2.0));
    float c = mod(a + b, 2.0) + f;

    color_in.r += lerp_f(-f, f, c);
    color_in = get_srgb(color_in);

    color_in = clamp(
        vec3(
            round(color_in.r * d) / d,
            round(color_in.g * d) / d,
            round(color_in.b * d) / d
        ),
        0.0, 1023.5 / 1024.0
    );
    return color_in;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec3 color = inputColor.rgb;
    float total = rows * cols;

    float dith = max(1.0, dither_size);
    float a = floor(mod(uv.x * resolution.x / dith, 2.0));
    float b = floor(mod(uv.y * resolution.y / dith, 2.0));
    float dither_offset = mod(a + b, 2.0) * (1.0 / total);

    float lum = dot(color, vec3(0.299, 0.587, 0.114));
    lum = clamp(lum + lerp_f(0.0, dither_offset, dither_amount), 0.0, 1.0);

    float index = (floor(lum * total) + 0.5) / total;

    vec3 pal_read = texture2D(pal, vec2(index, 0.0)).rgb;
    outputColor = vec4(pal_read, 1.0);
}
`;
