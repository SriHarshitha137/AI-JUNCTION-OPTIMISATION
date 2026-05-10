import { create } from 'zustand';
import { incidents as seedIncidents, junctions } from '../data/mockData.js';
import { calculateTpi, signalFromTpi } from '../utils/tpi.js';

const savedUser = JSON.parse(localStorage.getItem('ajs-user') || 'null');
const savedTheme = localStorage.getItem('ajs-theme') || 'dark';

export const useAppStore = create((set, get) => ({
  user: savedUser,
  theme: savedTheme,
  sidebarOpen: true,
  junctions,
  incidents: seedIncidents,
  emergency: { active: false, type: 'Ambulance', timer: 0 },
  login: ({ email, role }) => {
    const user = { name: email.split('@')[0] || 'Operator', email, role };
    localStorage.setItem('ajs-user', JSON.stringify(user));
    set({ user });
  },
  logout: () => {
    localStorage.removeItem('ajs-user');
    set({ user: null });
  },
  toggleTheme: () =>
    set((state) => {
      const theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem('ajs-theme', theme);
      return { theme };
    }),
  toggleSidebar: () => set((state) => ({ sidebarOpen: !state.sidebarOpen })),
  addIncident: (incident) =>
    set((state) => ({
      incidents: [{ id: Date.now(), time: 'Now', status: 'New', ...incident }, ...state.incidents],
    })),
  activateEmergency: (type = 'Ambulance') => {
    const boosted = get().junctions.map((junction, index) => {
      const emergency = index < 4 ? 100 : junction.emergency;
      const next = { ...junction, emergency };
      const tpi = calculateTpi(next);
      return { ...next, signal: index < 4 ? 'Green' : signalFromTpi(tpi), timer: index < 4 ? 90 : junction.timer };
    });
    set({ emergency: { active: true, type, timer: 90 }, junctions: boosted });
  },
  restoreEmergency: () =>
    set({
      emergency: { active: false, type: 'Ambulance', timer: 0 },
      junctions: junctions.map((junction) => ({ ...junction, signal: signalFromTpi(calculateTpi(junction)) })),
    }),
  tickSimulation: () =>
    set((state) => {
      const emergency = state.emergency.active
        ? { ...state.emergency, timer: Math.max(0, state.emergency.timer - 1) }
        : state.emergency;
      return { emergency };
    }),
}));
