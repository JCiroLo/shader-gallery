import { useMemo, useState } from "react";
import { useShallow } from "zustand/shallow";
import { ChevronLeftIcon } from "lucide-react";
import clazz from "@/lib/clazz";
import EffectActions from "@/components/effect-actions";
import IconButton from "@/components/icon-button";
import PropertyInput from "@/components/property-input";
import useEffectsStore from "@/stores/effects-store";
import useSettingsStore from "@/stores/settings-store";
import { EFFECT_DEFAULTS, EFFECT_ICONS, EFFECT_KEYS, EFFECT_NAMES, EFFECT_PROPERTIES } from "@/lib/constants";
import type { Effect, EffectInput, EffectInputNumber, EffectInputSelect, EffectProperties } from "@/types";

const c = clazz("effects-properties-tabs");

const inputs = EFFECT_KEYS.reduce(
  (prev, key) => ({
    ...prev,
    [key]: Object.entries(EFFECT_DEFAULTS[key]).reduce(
      (prev, [key, options]) => ({ ...prev, [key]: options }),
      {} as Record<string, EffectInput>,
    ),
  }),
  {} as Record<Effect, Record<string, EffectInput>>,
);

const EffectPropertiesTabs = () => {
  const { properties, setEffectProperty } = useEffectsStore(
    useShallow((state) => ({
      properties: state.properties,
      setEffectProperty: state.setEffectProperty,
    })),
  );
  const { effect, previousTab, setTab } = useSettingsStore(
    useShallow((state) => ({ effect: state.effect || "tint", previousTab: state.previousTab, setTab: state.setTab })),
  );

  const [property, setProperty] = useState<EffectProperties[typeof effect]>(EFFECT_PROPERTIES[effect][0]);

  const input = useMemo(() => inputs[effect][property], [effect, property]);

  const inputProps = useMemo(
    () => ({
      type: input.type,
      value: properties[effect][property],
      min: (EFFECT_DEFAULTS[effect][input.key] as EffectInputNumber).min,
      max: (EFFECT_DEFAULTS[effect][input.key] as EffectInputNumber).max,
      step: (EFFECT_DEFAULTS[effect][input.key] as EffectInputNumber).step,
      options: Object.values((EFFECT_DEFAULTS[effect][input.key] as EffectInputSelect).options || {}).map((option) => ({
        key: option.key,
        label: option.label,
        value: option.value,
      })),
      onChange(newValue: unknown) {
        if (!effect) return;
        setEffectProperty(effect, input.key as keyof EffectInput[], newValue);
      },
    }),
    [input.type, input.key, properties, effect, property, setEffectProperty],
  );

  if (!effect) return null;

  return (
    <div className={c()}>
      <div className={c("header")}>
        <div className={c("go-back")}>
          <IconButton onClick={() => setTab(previousTab)}>
            <ChevronLeftIcon className={c("go-back-icon")} />
          </IconButton>
          <h2 className={c("title")}>{EFFECT_NAMES[effect]}</h2>
        </div>
        <EffectActions />
      </div>
      <hr />
      <div className={c("input")}>
        <label>{input.label}</label>
        <PropertyInput {...inputProps} />
        <span>{inputProps.value as string}</span>
      </div>
      <ul className={c("properties")}>
        {EFFECT_PROPERTIES[effect].map((property, index) => {
          const Icon = EFFECT_ICONS[inputs[effect][property].icon];
          return (
            <li key={property + index} className={c("property", { active: property === input.key })}>
              <IconButton key={property} onClick={() => setProperty(property)}>
                <Icon />
              </IconButton>
              <span>{inputs[effect][property].label}</span>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default EffectPropertiesTabs;
