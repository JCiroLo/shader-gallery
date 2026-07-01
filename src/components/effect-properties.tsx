import React from "react";
import { useShallow } from "zustand/shallow";
import clazz from "@/lib/clazz";
import EffectActions from "@/components/effect-actions";
import PropertiesInputs from "@/components/properties-inputs";
import useEffectsStore from "@/stores/effects-store";
import useSettingsStore from "@/stores/settings-store";
import { EFFECT_DEFAULTS, EFFECT_KEYS, EFFECT_NAMES } from "@/lib/constants";
import type { Effect, EffectInput, EffectInputNumber, EffectInputSelect } from "@/types";

const c = clazz("effects-properties");

const inputs = EFFECT_KEYS.reduce(
  (prev, key) => ({
    ...prev,
    [key]: Object.entries(EFFECT_DEFAULTS[key]).map(([, options]) => options),
  }),
  {} as Record<Effect, EffectInput[]>,
);

const EffectProperties = () => {
  const { properties, setEffectProperty } = useEffectsStore(
    useShallow((state) => ({
      properties: state.properties,
      setEffectProperty: state.setEffectProperty,
    })),
  );
  const { effect } = useSettingsStore(useShallow((state) => ({ effect: state.effect })));

  if (!effect) return null;

  return (
    <div className={c()}>
      <div className={c("header")}>
        <h2 className={c("title")}>{EFFECT_NAMES[effect]}</h2>
        <EffectActions />
      </div>
      <hr />
      <ul className={c("list")}>
        {inputs[effect].map((input: EffectInput) => {
          const type = input.type;
          const value = properties[effect][input.key];
          const props = EFFECT_DEFAULTS[effect][input.key];
          const options = Object.values((props as EffectInputSelect).options || {}).map((option) => ({
            key: option.key,
            label: option.label,
            value: option.value,
          }));

          function onChange(newValue: unknown) {
            if (!effect) return;

            setEffectProperty(effect, input.key as keyof EffectInput[], newValue);
          }

          return (
            <React.Fragment key={effect + props.key}>
              <li className={c("property")} role="group">
                <label>
                  {input.label}
                  {type === "number" && <span className={c("property-value")}>({value as string})</span>}
                </label>
                {type === "color" && <PropertiesInputs.color value={value as string} onChange={onChange} />}
                {type === "number" && (
                  <PropertiesInputs.number
                    value={value as number}
                    min={(props as EffectInputNumber).min}
                    max={(props as EffectInputNumber).max}
                    step={(props as EffectInputNumber).step}
                    onChange={onChange}
                  />
                )}
                {type === "boolean" && <PropertiesInputs.boolean value={value as boolean} onChange={onChange} />}
                {type === "array-2" && (
                  <PropertiesInputs.array2 value={value as [number, number]} onChange={onChange} />
                )}
                {type === "array-3" && (
                  <PropertiesInputs.array3 value={value as [number, number, number]} onChange={onChange} />
                )}
                {type === "select" && (
                  <PropertiesInputs.select value={value as string} options={options} onChange={onChange} />
                )}
              </li>
            </React.Fragment>
          );
        })}
      </ul>
    </div>
  );
};

export default EffectProperties;
