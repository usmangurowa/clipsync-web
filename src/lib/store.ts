import { Tables } from "@/supabase/db-types";
import { create } from "zustand";

interface ClipsStoreType {
  clips: Tables<"clipboard">[];
  addClip: (clip: Tables<"clipboard">) => void;
  removeClip: (clip: Tables<"clipboard">) => void;
  removeAllClips: () => void;
  initClips: (clips: Tables<"clipboard">[]) => void;
}

export const useClipsStore = create<ClipsStoreType>((set) => ({
  clips: [],
  addClip: (clip) => set((state) => ({ clips: [clip, ...state.clips] })),
  removeAllClips: () => set({ clips: [] }),
  removeClip: (clip) =>
    set((state) => ({
      clips: state.clips.filter((c) => c.id !== clip.id),
    })),
  initClips: (clips) => set({ clips }),
}));
