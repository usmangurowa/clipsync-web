import { Tables } from "@/supabase/db-types";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ClipsStoreType {
  clips: Tables<"clipboard">[];
  addClip: (clip: Tables<"clipboard">) => void;
  removeClip: (clip: Tables<"clipboard">) => void;
  removeAllClips: () => void;
  initClips: (clips: Tables<"clipboard">[]) => void;
}

export const useClipsStore = create<ClipsStoreType>((set) => ({
  clips: [],
  addClip: (clip) =>
    set((state) => {
      if (!state.clips.find((c) => c.id === clip.id)) {
        return { clips: [clip, ...state.clips] };
      }
      return state;
    }),
  removeAllClips: () => set({ clips: [] }),
  removeClip: (clip) =>
    set((state) => ({
      clips: state.clips.filter((c) => c.id !== clip.id),
    })),
  initClips: (clips) => set({ clips }),
}));

interface AppConfigStoreType {
  lastLoginOption: "email" | "email-password" | "github" | "google" | "";
  update: (config: Partial<AppConfigStoreType>) => void;
}

export const useAppConfigStore = create(
  persist<AppConfigStoreType>(
    (set) => ({
      lastLoginOption: "",
      update: (config) => set(config),
    }),
    {
      name: "app-config-store",
    },
  ),
);
