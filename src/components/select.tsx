import { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDownIcon } from "lucide-react";
import clazz from "@/lib/clazz";

export type SelectOption<T> = {
  label: string;
  value: T;
  disabled?: boolean;
};

export type SelectProps<T> = {
  value: T | null;
  options: SelectOption<T>[];
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  onChange: (value: T) => void;
};

const c = clazz("select");

function Select<T>({ value, options, onChange, placeholder = "Select", disabled = false, className = "" }: SelectProps<T>) {
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectOption = (option: SelectOption<T>) => {
    if (option.disabled) return;

    onChange(option.value);

    setOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>) => {
    if (disabled) return;

    switch (event.key) {
      case "ArrowDown":
        event.preventDefault();

        setOpen(true);
        setActiveIndex((index) => Math.min(index + 1, options.length - 1));

        break;

      case "ArrowUp":
        event.preventDefault();

        setOpen(true);
        setActiveIndex((index) => Math.max(index - 1, 0));

        break;

      case "Enter":
        break;

      case " ":
        event.preventDefault();

        if (open) {
          selectOption(options[activeIndex]);
        } else {
          setOpen(true);
        }

        break;

      case "Escape":
        setOpen(false);

        break;
    }
  };

  return (
    <div ref={ref} role="combobox" className={`${c()} ${className}`}>
      <button
        id={id}
        type="button"
        disabled={disabled}
        className={c("trigger")}
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen(!open)}
        onKeyDown={handleKeyDown}
      >
        <span>{selected?.label ?? placeholder}</span>
        <motion.span
          animate={{
            rotate: open ? 180 : 0,
          }}
          transition={{
            duration: 0.15,
          }}
          style={{ display: "inline-flex" }}
        >
          <ChevronDownIcon className={c("icon")} />
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.ul
            className={c("options")}
            role="listbox"
            aria-labelledby={id}
            initial={{
              opacity: 0,
              y: -6,
              scale: 0.98,
            }}
            animate={{
              opacity: 1,
              y: 0,
              scale: 1,
            }}
            exit={{
              opacity: 0,
              y: -6,
              scale: 0.98,
            }}
            transition={{
              duration: 0.15,
              ease: "easeOut",
            }}
          >
            {options.map((option, index) => (
              <li
                key={String(option.value)}
                className={c("option", {
                  active: option.value === value,
                  disabled: option.disabled,
                })}
                role="option"
                aria-selected={option.value === value}
                aria-disabled={option.disabled}
                onMouseEnter={() => setActiveIndex(index)}
                onClick={() => selectOption(option)}
              >
                {option.label}
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}

export default Select;
