import { create } from 'zustand';

export const useFluidState = create((set) => ({
    mouse: { x: 0, y: 0 },
    targetMouse: { x: 0, y: 0 },
    scrollVelocity: 0,
    isClicked: false,

    setMouse: (x, y) => set((state) => ({
        targetMouse: { x, y },
        // Interpolated mouse position update can be handled in a raf loop or shader
    })),

    updateMouse: (x, y) => set({ mouse: { x, y } }),

    setScrollVelocity: (v) => set({ scrollVelocity: v }),

    triggerClick: (val) => set({ isClicked: val }),
}));
