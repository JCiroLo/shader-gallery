export default `
  uniform vec3 uColor;
  uniform float uOpacity;

  void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {
    // Convertir a escala de grises
    float gray = dot(inputColor.rgb, vec3(0.299, 0.587, 0.114));
    vec3 grayVec = vec3(gray);

    // Mezclar con el color elegido
    vec3 tinted = grayVec * uColor;

    // Mezclar el resultado final basado en la opacidad del efecto
    vec3 finalColor = mix(inputColor.rgb, tinted, uOpacity);

    outputColor = vec4(finalColor, inputColor.a);
  }
`;
