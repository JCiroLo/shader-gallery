import React from "react";
import PropertiesInputs from "@/components/properties-inputs";
import type { EffectInputSelectOption, EffectInputType } from "@/types";

type PropertyInputProps = {
  type: EffectInputType;
  value: unknown;
  min?: number;
  max?: number;
  step?: number;
  options?: EffectInputSelectOption[];
  onChange: (newValue: unknown) => void;
};

const PropertyInput: React.FC<PropertyInputProps> = ({ type, value, min, max, step, options, onChange }) => {
  return (
    <>
      {type === "color" && <PropertiesInputs.color value={value as string} onChange={onChange} />}
      {type === "number" && (
        <PropertiesInputs.number value={value as number} min={min} max={max} step={step} onChange={onChange} />
      )}
      {type === "boolean" && <PropertiesInputs.boolean value={value as boolean} onChange={onChange} />}
      {type === "array-2" && <PropertiesInputs.array2 value={value as [number, number]} onChange={onChange} />}
      {type === "array-3" && <PropertiesInputs.array3 value={value as [number, number, number]} onChange={onChange} />}
      {type === "select" && <PropertiesInputs.select value={value as string} options={options} onChange={onChange} />}
    </>
  );
};

export default PropertyInput;
