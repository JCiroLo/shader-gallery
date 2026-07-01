import React, { useRef } from "react";
import clazz from "@/lib/clazz";

type InputFileButtonProps = {
  className?: string;
  accept: string;
  children?: React.ReactNode;
  onChange: (url: string) => void;
};

const c = clazz("input-file-button");

const InputFileButton: React.FC<InputFileButtonProps> = ({ className, accept, children, onChange }) => {
  const inputFileRef = useRef<HTMLInputElement>(null);

  const buttonClassName = c("button") + (className ? " " + className : "");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);

      onChange(url);
    }
  };

  return (
    <>
      <input
        ref={inputFileRef}
        className={c("input")}
        type="file"
        accept={accept}
        onChange={handleInputChange}
        hidden
      />
      <button className={buttonClassName} onClick={() => inputFileRef.current?.click()}>
        {children}
      </button>
    </>
  );
};

export default InputFileButton;
