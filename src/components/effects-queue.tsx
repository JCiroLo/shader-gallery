import { useShallow } from "zustand/shallow";
import EffectActions from "@/components/effect-actions";
import InputFileButton from "@/components/input-file-button";
import useEffectsStore from "@/stores/effects-store";
import useSettingsStore from "@/stores/settings-store";
import { EFFECT_NAMES } from "@/lib/constants";
import clazz from "@/lib/clazz";
import type { Effect } from "@/types";

const c = clazz("effects-queue");

const EffectsQueue = () => {
  const { image, setTab, setEffect, setImage } = useSettingsStore(
    useShallow((state) => ({
      image: state.image,
      setTab: state.setTab,
      setEffect: state.setEffect,
      setImage: state.setImage,
    })),
  );
  const { queue } = useEffectsStore(useShallow((state) => ({ queue: state.queue })));

  function handleEffectClick(effect: Effect) {
    setTab("properties");
    setEffect(effect);
  }

  return (
    <ul className={c()}>
      <li className={c("effect")}>
        <InputFileButton className={c("effect-button")} accept="image/*" onChange={(url) => setImage(url)}>
          <img src={image} alt={"Upload image"} />
          <p>Image</p>
        </InputFileButton>
      </li>
      {Array.from(queue).map((effect) => (
        <li className={c("effect")} key={effect}>
          <button className={c("effect-button")} onClick={() => handleEffectClick(effect)}>
            <img
              src="https://www.befunky.com/images/wp/wp-2025-02-film-grain-before.jpg?auto=avif,webp&format=jpg&width=944"
              alt={effect}
            />
            <p>{EFFECT_NAMES[effect]}</p>
          </button>
          <EffectActions effect={effect} displayReset={false} />
        </li>
      ))}
    </ul>
  );
};

export default EffectsQueue;
