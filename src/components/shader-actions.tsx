import React, { useRef } from "react";
import useSettingsStore from "@/stores/settings-store";
import clazz from "@/lib/clazz";

const c = clazz("shader-settings-panel-actions");

const ShaderActions = () => {
  const { setImage } = useSettingsStore();

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
        Subir Imagen
      </button>
      <button className={c("action")}>Exportar</button>
    </div>
  );
};

export default ShaderActions;
