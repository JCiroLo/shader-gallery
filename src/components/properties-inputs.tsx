import clazz from "@/lib/clazz";
import type { EffectInputSelectOption } from "@/types";

type ColorInputProps = {
  value: string;
  onChange: (value: string) => void;
};

type NumberInputProps = {
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
};

type BooleanInputProps = {
  value: boolean;
  onChange: (value: boolean) => void;
};

type Array2InputProps = {
  value: [number, number];
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: [number, number]) => void;
};

type Array3InputProps = {
  value: [number, number, number];
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: [number, number, number]) => void;
};

type SelectInputProps = {
  value: string;
  options?: EffectInputSelectOption[];
  onChange: (value: string) => void;
};

type Sampler2DInputProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

const classArray2Input = clazz("array-2-input");
const classArray3Input = clazz("array-3-input");
const classSampler2DInput = clazz("sampler-2d-input");

const ColorInput: React.FC<ColorInputProps> = ({ value, onChange }) => {
  return <input type="color" value={value} onChange={(event) => onChange(event.target.value as never)} />;
};

const NumberInput: React.FC<NumberInputProps> = ({ value, min, max, step, onChange }) => {
  return (
    <input
      type="range"
      min={min}
      max={max}
      step={step || 0.01}
      value={value as number}
      onChange={(event) => onChange(Number(event.target.value) as never)}
    />
  );
};

const BooleanInput: React.FC<BooleanInputProps> = ({ value, onChange }) => {
  return (
    <input type="checkbox" checked={value as boolean} onChange={(event) => onChange(event.target.checked as never)} />
  );
};

const Array2Input: React.FC<Array2InputProps> = ({ value, min, max, step, onChange }) => {
  return (
    <div className={classArray2Input()}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0] as number}
        onChange={(event) => onChange([Number(event.target.value), value[1]] as never)}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[1] as number}
        onChange={(event) => onChange([value[0], Number(event.target.value)] as never)}
      />
    </div>
  );
};

const Array3Input: React.FC<Array3InputProps> = ({ value, min, max, step, onChange }) => {
  return (
    <div className={classArray3Input()}>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[0] as number}
        onChange={(event) => onChange([Number(event.target.value), value[1], value[2]] as never)}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[1] as number}
        onChange={(event) => onChange([value[0], Number(event.target.value), value[2]] as never)}
      />
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value[2] as number}
        onChange={(event) => onChange([value[0], value[1], Number(event.target.value)] as never)}
      />
    </div>
  );
};

const SelectInput: React.FC<SelectInputProps> = ({ value, options, onChange }) => {
  return (
    <select value={value} onChange={(event) => onChange(event.target.value)}>
      {(options || []).map((option) => (
        <option key={option.key} value={option.key}>
          {option.label}
        </option>
      ))}
    </select>
  );
};

const Sampler2d: React.FC<Sampler2DInputProps> = ({ value, onChange }) => {
  return (
    <div className={classSampler2DInput()}>
      {value.map((color, i) => (
        <input
          key={i}
          type="color"
          value={color}
          onChange={(e) => {
            const next = [...value];
            next[i] = e.target.value;
            onChange(next);
          }}
        />
      ))}
    </div>
  );
};

const PropertiesInputs = {
  color: ColorInput,
  number: NumberInput,
  boolean: BooleanInput,
  array2: Array2Input,
  array3: Array3Input,
  select: SelectInput,
  sampler2d: Sampler2d,
};

export default PropertiesInputs;
