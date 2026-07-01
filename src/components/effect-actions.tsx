import { RotateCcwIcon, EyeIcon, TrashIcon } from "lucide-react";
import { useShallow } from "zustand/shallow";
import IconButton from "@/components/icon-button";
import useEffectsStore from "@/stores/effects-store";
import useSettingsStore from "@/stores/settings-store";
import clazz from "@/lib/clazz";
import type { Effect } from "@/types";

type EffectActionsProps = {
  effect?: Effect;
  displayReset?: boolean;
  displayHide?: boolean;
  displayRemove?: boolean;
};

const c = clazz("effect-actions");

const EffectActions: React.FC<EffectActionsProps> = ({
  effect: propsEffect,
  displayHide = true,
  displayReset = true,
  displayRemove = true,
}) => {
  const { removeEffect, resetEffectProperties } = useEffectsStore(
    useShallow((state) => ({
      properties: state.properties,
      setEffectProperty: state.setEffectProperty,
      removeEffect: state.removeEffect,
      resetEffectProperties: state.resetEffectProperties,
    })),
  );
  const { effect, tab, previousTab, setTab } = useSettingsStore(
    useShallow((state) => ({
      effect: state.effect,
      tab: state.tab,
      previousTab: state.previousTab,
      setTab: state.setTab,
    })),
  );

  const currentEffect = propsEffect || effect;

  function handleResetClick() {
    if (!currentEffect) return;

    resetEffectProperties(currentEffect);
  }

  function handleHideClick() {}

  function handleRemoveClick() {
    if (!currentEffect) return;

    removeEffect(currentEffect);

    if (tab === "layers") return;

    setTab(previousTab);
  }

  return (
    <div className={c("")}>
      {displayReset && (
        <IconButton className={c("action", { flip: true })} onClick={handleResetClick}>
          <RotateCcwIcon />
        </IconButton>
      )}
      {displayHide && (
        <IconButton className={c("action")} onClick={handleHideClick}>
          <EyeIcon />
        </IconButton>
      )}
      {displayRemove && (
        <IconButton className={c("action")} onClick={handleRemoveClick}>
          <TrashIcon />
        </IconButton>
      )}
    </div>
  );
};

export default EffectActions;
