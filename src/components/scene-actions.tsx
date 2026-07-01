import { useShallow } from "zustand/shallow";
import { VideoIcon, RotateCcwIcon, ArrowDownToLineIcon } from "lucide-react";
import IconButton from "@/components/icon-button";
import useRefsStore from "@/stores/refs-store";
import clazz from "@/lib/clazz";

const c = clazz("scene-actions");

const SceneActions = () => {
  const { camera } = useRefsStore(useShallow((state) => ({ camera: state.camera })));

  function handleResetClick() {
    if (!camera) return;

    camera.reset();
  }

  function handleExport() {
    const canvas = document.querySelector("canvas");

    if (canvas) {
      const dataUrl = canvas.toDataURL("image/png");
      const link = document.createElement("a");

      link.download = `shader-gallery-${Date.now()}.png`;
      link.href = dataUrl;
      link.click();
    }
  }

  return (
    <div className={c()}>
      <div className={c("section")}>
        <VideoIcon className={c("icon")} />
        <IconButton className={c("action")} onClick={handleResetClick}>
          <RotateCcwIcon />
        </IconButton>
      </div>
      <div className={c("section")}>
        <p className={c("label")}>Export</p>
        <IconButton className={c("action")} onClick={handleExport}>
          <ArrowDownToLineIcon />
        </IconButton>
      </div>
    </div>
  );
};

export default SceneActions;
