// credits: https://godotshaders.com/shader/simple-film-grain/

export default `
uniform float time;
uniform float amount;
uniform float speed;

float random (vec2 uv) {
    return fract(sin(dot(uv.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    vec2 noise_uv = vec2(uv.x + time * speed, uv.y + time * speed);
    
    vec3 noise = vec3(random(noise_uv), random(noise_uv), random(noise_uv));
    
    vec3 noisyColor = inputColor.rgb * noise;
    
    vec3 finalColor = mix(inputColor.rgb, noisyColor, amount);
    
    outputColor = vec4(finalColor, inputColor.a);
}
`;
