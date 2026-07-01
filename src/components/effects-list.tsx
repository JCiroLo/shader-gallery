import { useShallow } from "zustand/shallow";
import { SlidersHorizontalIcon } from "lucide-react";
import clazz from "@/lib/clazz";
import { EFFECT_KEYS, EFFECT_NAMES } from "@/lib/constants";
import useEffectsStore from "@/stores/effects-store";
import useSettingsStore from "@/stores/settings-store";
import type { Effect } from "@/types";

const c = clazz("effects-list");

const EffectsList = () => {
  const { setTab, setEffect } = useSettingsStore(
    useShallow((state) => ({ setTab: state.setTab, setEffect: state.setEffect })),
  );
  const { queue, addEffect } = useEffectsStore(
    useShallow((state) => ({ queue: state.queue, addEffect: state.addEffect })),
  );

  function handleAddEffect(effect: Effect) {
    if (!queue.has(effect)) {
      addEffect(effect);
      return;
    }

    setTab("properties");
    setEffect(effect);
  }

  return (
    <ul className={c()}>
      {EFFECT_KEYS.map((effect) => (
        <li key={effect} className={c("effect")}>
          <button className={c("effect-button", { active: queue.has(effect) })} onClick={() => handleAddEffect(effect)}>
            <img
              src="https://www.befunky.com/images/wp/wp-2025-02-film-grain-before.jpg?auto=avif,webp&format=jpg&width=944"
              alt={effect}
            />
            <SlidersHorizontalIcon className={c("effect-options-icon", { visible: queue.has(effect) })} />
            <p>{EFFECT_NAMES[effect]}</p>
            <span className={c("effect-background", { visible: queue.has(effect) })} />
          </button>
        </li>
      ))}
    </ul>
  );
};

export default EffectsList;
