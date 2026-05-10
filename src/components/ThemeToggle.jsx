import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';
import { useAppStore } from '../store/useAppStore.js';

export default function ThemeToggle() {
  const theme = useAppStore((state) => state.theme);
  const toggleTheme = useAppStore((state) => state.toggleTheme);

  return (
    <motion.button
      type="button"
      onClick={toggleTheme}
      whileHover={{ scale: 1.05, rotate: 8 }}
      whileTap={{ scale: 0.96, rotate: 0 }}
      transition={{ duration: 0.25 }}
      className="relative rounded-2xl border border-white/10 bg-white/5 p-2.5 text-slate-200 transition hover:bg-white/15 light:border-slate-200 light:text-slate-700"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
      <span className="absolute -right-1 -top-1 inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.6)]" />
    </motion.button>
  );
}
