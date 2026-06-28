// credits: https://godotshaders.com/shader/simple-crt-vhs/

export default `
uniform float time;
uniform float scanlines_1;
uniform float scanlines_2;
uniform float scan_reduction;
uniform float vinnette_alpla;
uniform float vinnette_inner_radius;
uniform float vinnette_outer_radius;

float random (vec2 uv) {
    return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 uv_noise = uv * time;
    vec2 uv_scan1 = vec2(uv.x, uv.y + time);
    vec2 uv_scan2 = vec2(uv.x, uv.y + time * 0.4);
    
    vec4 screen = inputColor;
    
    float scanlines1 = sin(uv_scan1.y * scanlines_1) * scan_reduction - scan_reduction;
    float scanlines2 = sin(uv_scan2.y * scanlines_2) * scan_reduction - scan_reduction;
    
    float r = random(uv_noise);
    vec4 noise = vec4(r, r, r, 0.2);
    
    float vinnette_x = abs(uv.x - 0.5) * 2.0;
    float vinnette_y = abs(uv.y - 0.5) * 2.0;
    float vinnette_q = 1.0 - (1.0 - sqrt(vinnette_x * vinnette_x + vinnette_y * vinnette_y) / vinnette_outer_radius) / (1.0 - vinnette_inner_radius);
    
    screen += vec4(0.0, 0.0, 0.0, vinnette_q * vinnette_alpla);
    
    vec4 color = screen * noise;
    
    color.rgb += vec3(scanlines1);
    color.rgb += vec3(scanlines2);
    
    color.rgb *= vec3(5.0, 5.0, 5.0);
    
    outputColor = color;
}
`;
