import React from "react";
import { useTexture, useAspect } from "@react-three/drei";

type ImagePreviewProps = {
  src: string;
};

const ImagePreview: React.FC<ImagePreviewProps> = ({ src }) => {
  const texture = useTexture(src);
  const { width, height } = texture.image as HTMLImageElement;

  const scale = useAspect(width, height, 1);

  return (
    <mesh scale={scale}>
      <planeGeometry />
      <meshBasicMaterial map={texture} toneMapped={false} />
    </mesh>
  );
};

export default ImagePreview;
