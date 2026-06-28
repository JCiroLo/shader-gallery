import { DataTexture, RGBAFormat, NearestFilter, SRGBColorSpace } from "three";

const TextureTools = {
  buildPalette(colors: string[]) {
    const data = new Uint8Array(colors.length * 4);
    colors.forEach((hex, i) => {
      const r = parseInt(hex.slice(1, 3), 16);
      const g = parseInt(hex.slice(3, 5), 16);
      const b = parseInt(hex.slice(5, 7), 16);
      data[i * 4 + 0] = r;
      data[i * 4 + 1] = g;
      data[i * 4 + 2] = b;
      data[i * 4 + 3] = 255;
    });
    const tex = new DataTexture(data, colors.length, 1, RGBAFormat);
    tex.colorSpace = SRGBColorSpace;
    tex.magFilter = NearestFilter;
    tex.minFilter = NearestFilter;
    tex.needsUpdate = true;
    return tex;
  },
};

export default TextureTools;
