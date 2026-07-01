import React, { useRef } from "react";
import { useShallow } from "zustand/shallow";
import useSettingsStore from "@/stores/settings-store";
import clazz from "@/lib/clazz";

const c = clazz("app-actions");

const AppActions = () => {
  const { setImage } = useSettingsStore(useShallow((state) => ({ setImage: state.setImage })));

  const inputFileRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();

    if (!event.target.files || event.target.files.length === 0) return;

    const file = event.target.files[0];

    if (file) {
      const url = URL.createObjectURL(file);

      setImage(url);
    }
  };

  return (
    <div className={c()}>
      <input
        ref={inputFileRef}
        className={c("input-file")}
        type="file"
        accept="image/*"
        onChange={handleImageUpload}
        hidden
      />
      <button className={c("action")} onClick={() => inputFileRef.current?.click()}>
        Upload image
      </button>
    </div>
  );
};

export default AppActions;
