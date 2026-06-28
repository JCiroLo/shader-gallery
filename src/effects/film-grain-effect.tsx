import { useMemo } from "react";
import Effect from "@/components/effect";
import filmGrainShader from "@/shaders/film-grain.glsl";
import useEffectsStore from "@/stores/effects-store";

const FilmGrainEffect = () => {
  const properties = useEffectsStore((state) => state.properties["film-grain"]);

  const uniforms = useMemo(
    () => [
      { name: "amount", value: properties.amount as number },
      { name: "speed", value: properties.speed as number },
    ],
    [properties],
  );

  return <Effect name="FilmGrain" shader={filmGrainShader} uniforms={uniforms} />;
};

export default FilmGrainEffect;
