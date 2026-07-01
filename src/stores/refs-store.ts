import { create } from "zustand";
import type { OrbitControls } from "three-stdlib";

type RefsStore = {
  camera: OrbitControls | null;
  setCamera: (camera: OrbitControls | null) => void;
};

const useRefsStore = create<RefsStore>((set) => ({
  camera: null,
  setCamera: (camera) => set({ camera }),
}));

export default useRefsStore;
