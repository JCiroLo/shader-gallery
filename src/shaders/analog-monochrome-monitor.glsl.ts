export default `
uniform sampler2D tiledtexture;
uniform float opacity;
uniform float pixel_size;
uniform bool greyscale;
uniform float contrast;
uniform vec3 pixel_colors;
uniform vec3 background_color;

vec4 to_grayscale(vec4 color) {
    float luminance = 0.21 * color.r + 0.72 * color.g + 0.07 * color.b;
    return vec4(luminance, luminance, luminance, color.a);
}

vec4 adjust_contrast(vec4 color) {
    color.rgb = (color.rgb - 0.5) * max(contrast, 0.0) + 0.5;
    return color;
}

vec4 hard_mix(vec4 color1, vec4 color2) {
    vec4 result;
    for (int i = 0; i < 4; i++) {
        float value = color1[i] + color2[i];
        result[i] = value >= 1.0 ? 1.0 : 0.0;
    }
    return result;
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 uv1 = floor(uv / pixel_size) * pixel_size;
    vec4 color1 = texture2D(inputBuffer, uv1);

    if (greyscale) {
        color1 = to_grayscale(color1);
        color1 = adjust_contrast(color1);
    }

    vec4 color2 = texture2D(tiledtexture, uv / pixel_size);
    vec4 final_result = mix(color1, hard_mix(color1, color2), opacity);

    if (final_result == vec4(1.0, 1.0, 1.0, 1.0)) {
        final_result = vec4(pixel_colors, 1.0);
    } else if (final_result == vec4(0.0, 0.0, 0.0, 1.0)) {
        final_result = vec4(background_color, 1.0);
    }

    outputColor = final_result;
}
`;
