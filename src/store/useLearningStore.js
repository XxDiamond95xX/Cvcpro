import { create } from 'zustand';
import courseData from '../data/courses.json';

export const useLearningStore = create((set) => ({
  currentModule: courseData.modules[0],
  currentChapterIndex: 0,
  activeSimulationParams: courseData.modules[0].chapters[0].simulation_preset,
  highlightedComponent: courseData.modules[0].chapters[0].focus_component,

  nextChapter: () => set((state) => {
    const nextIdx = state.currentChapterIndex + 1;
    if (nextIdx < state.currentModule.chapters.length) {
      const nextChapter = state.currentModule.chapters[nextIdx];
      return {
        currentChapterIndex: nextIdx,
        activeSimulationParams: nextChapter.simulation_preset,
        highlightedComponent: nextChapter.focus_component
      };
    }
    return state;
  }),

  prevChapter: () => set((state) => {
    const prevIdx = state.currentChapterIndex - 1;
    if (prevIdx >= 0) {
      const prevChapter = state.currentModule.chapters[prevIdx];
      return {
        currentChapterIndex: prevIdx,
        activeSimulationParams: prevChapter.simulation_preset,
        highlightedComponent: prevChapter.focus_component
      };
    }
    return state;
  })
}));
