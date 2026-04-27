import { create } from 'zustand';

export const useCvcStore = create((set) => ({
  params: {
    bp: 4.5,
    hp: 18.2,
    sh: 5,
    sc: 3
  },
  setParam: (key, val) => set((state) => ({
    params: { ...state.params, [key]: val }
  }))
}));
