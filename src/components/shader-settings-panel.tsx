import React from "react";
import { ChevronLeftIcon } from "lucide-react";
import PropertiesInputs from "@/components/properties-inputs";
import IconButton from "@/components/icon-button";
import Select, { type SelectOption } from "@/components/select";
import ShaderActions from "@/components/shader-actions";
import useEffectsStore from "@/stores/effects-store";
import useSettingsStore from "@/stores/settings-store";
import clazz from "@/lib/clazz";
import { EFFECT_DEFAULTS, EFFECT_NAMES, OPTIONS_WIDTH } from "@/lib/constants";
import type { Effect, EffectInput, EffectsOptions } from "@/types";

const c = clazz("controls-panel");

const effects: SelectOption<Effect>[] = Object.entries(EFFECT_NAMES).map(
  ([key, name]) => ({ label: name, value: key }) as SelectOption<Effect>,
);

const inputs = Object.entries(EFFECT_DEFAULTS).reduce(
  (prev, [effect, properties]) => ({
    ...prev,
    [effect]: Object.entries(properties).map(([, options]) => options),
  }),
  {} as EffectsOptions,
);

const ShaderSettingsPanel = () => {
  const { effect, optionsVisible, setEffect, toggleOptionsVisible } = useSettingsStore();
  const { setEffectProperty, properties } = useEffectsStore();

  return (
    <div className={c({ hide: !optionsVisible })} style={{ width: `min(calc(100% - 16px), ${OPTIONS_WIDTH}px)` }}>
      <IconButton className={c("visibility-toggle", { active: optionsVisible })} onClick={toggleOptionsVisible}>
        <ChevronLeftIcon />
      </IconButton>
      <Select value={effect} options={effects} placeholder="Effecto" onChange={setEffect} />
      {effect !== "none" && (
        <>
          <ul className={c("properties")}>
            {inputs[effect].map((input: EffectInput) => {
              const type = input.type;
              const value = properties[effect][input.key];
              const props = EFFECT_DEFAULTS[effect][input.key];
              const options = Object.values(props.options || {}).map((option) => ({
                key: option.key,
                label: option.label,
                value: option.value,
              }));

              function onChange(newValue: unknown) {
                if (effect === "none") return;

                setEffectProperty(effect, input.key as keyof EffectInput[], newValue);
              }

              return (
                <React.Fragment key={effect + props.key}>
                  <hr />
                  <li className={c("property")} role="group">
                    <label>
                      {input.label}
                      {type === "number" && <span className={c("property-value")}>({value as string})</span>}
                    </label>
                    {type === "color" && <PropertiesInputs.color value={value as string} onChange={onChange} />}
                    {type === "number" && (
                      <PropertiesInputs.number
                        value={value as number}
                        min={props.min}
                        max={props.max}
                        step={props.step}
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
                    {type === "sampler-2d" && (
                      <PropertiesInputs.sampler2d value={value as string[]} onChange={onChange} />
                    )}
                  </li>
                </React.Fragment>
              );
            })}
          </ul>
        </>
      )}

      <ShaderActions />
    </div>
  );
};

export default ShaderSettingsPanel;
