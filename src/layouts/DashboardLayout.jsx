import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import {
  Activity,
  AlertTriangle,
  BarChart3,
  BrainCircuit,
  Gauge,
  HeartPulse,
  LayoutDashboard,
  LogOut,
  Menu,
  RadioTower,
  Settings,
  ShieldCheck,
  Siren,
  UserCircle,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useAppStore } from '../store/useAppStore.js';
import ThemeToggle from '../components/ThemeToggle.jsx';

const nav = [
  { label: 'Dashboard', path: '/app', icon: LayoutDashboard },
  { label: 'Live Junction Status', path: '/app/junctions', icon: RadioTower },
  { label: 'Analytics & Prediction', path: '/app/analytics', icon: BarChart3 },
  { label: 'AI Decision Explainer', path: '/app/explainer', icon: BrainCircuit },
  { label: 'Emergency Corridor', path: '/app/emergency', icon: Siren },
  { label: 'Report Incidents', path: '/app/incidents', icon: AlertTriangle },
  { label: 'System Health', path: '/app/health', icon: Activity },
  { label: 'Settings', path: '/app/settings', icon: Settings },
];

export default function DashboardLayout() {
  const sidebarOpen = useAppStore((state) => state.sidebarOpen);
  const toggleSidebar = useAppStore((state) => state.toggleSidebar);
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-slate-950 text-white light:bg-slate-100 light:text-slate-950">
      <div className="fixed inset-0 -z-0 traffic-grid opacity-60 light:opacity-20" />
      <aside
        className={`fixed left-0 top-0 z-30 h-full border-r border-white/10 bg-slate-950/88 p-4 backdrop-blur-xl transition-all duration-300 light:border-slate-200 light:bg-white/90 ${
          sidebarOpen ? 'w-72' : 'w-20'
        }`}
      >
        <div className="mb-8 flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-400 p-2 text-slate-950 shadow-[0_16px_40px_-24px_rgba(56,189,248,0.9)]">
            <Gauge size={24} />
          </div>
          {sidebarOpen ? (
            <div>
              <div className="font-bold">AI Junction</div>
              <div className="text-xs text-slate-400 light:text-slate-500">Optimization System</div>
            </div>
          ) : (
            <div className="sr-only">AI Junction Optimization</div>
          )}
        </div>
        <nav className="space-y-2">
          {nav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === '/app'}
              title={sidebarOpen ? undefined : item.label}
              className={({ isActive }) =>
                `group flex items-center gap-3 rounded-2xl px-3 py-3 text-sm transition duration-300 ${
                  isActive
                    ? 'bg-cyan-400 text-slate-950 shadow-[0_12px_32px_-18px_rgba(56,189,248,0.9)]'
                    : 'text-slate-300 hover:bg-white/10 light:text-slate-700 light:hover:bg-slate-100'
                }`
              }
            >
              <item.icon size={19} className="transition duration-300 group-hover:text-cyan-300" />
              {sidebarOpen && <span>{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className={`relative z-10 transition-all duration-300 ${sidebarOpen ? 'md:pl-72' : 'md:pl-20'}`}>
        <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 px-4 py-3 backdrop-blur-xl transition duration-300 light:border-slate-200 light:bg-white/80">
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={toggleSidebar}
              className="rounded-2xl border border-white/10 bg-white/5 p-2.5 text-slate-200 transition hover:scale-105 hover:border-cyan-300 light:border-slate-200 light:text-slate-700"
              aria-label="Toggle sidebar"
            >
              <Menu size={20} />
            </button>
            <div className="hidden items-center gap-2 rounded-full border border-emerald-400/25 bg-emerald-400/10 px-4 py-2 text-sm text-emerald-200 md:flex light:text-emerald-700">
              <ShieldCheck size={16} /> Network AI active
            </div>
            <div className="ml-auto flex items-center gap-3">
              <button className="relative rounded-2xl border border-white/10 bg-white/5 p-2.5 text-slate-200 transition hover:scale-105 light:border-slate-200 light:text-slate-700" aria-label="Notifications">
                <HeartPulse size={18} />
                <span className="absolute -right-1 -top-1 inline-flex h-2.5 w-2.5 rounded-full bg-rose-400 shadow-[0_0_12px_rgba(251,146,60,0.6)]" />
              </button>
              <ThemeToggle />
              <div className="hidden items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-3 py-2 md:flex light:border-slate-200">
                <UserCircle size={22} />
                <div>
                  <div className="text-sm font-semibold">{user?.name}</div>
                  <div className="text-xs text-slate-400 light:text-slate-500">{user?.role}</div>
                </div>
              </div>
              <button
                onClick={() => {
                  logout();
                  navigate('/');
                }}
                className="rounded-2xl border border-white/10 bg-white/5 p-2.5 text-slate-300 transition hover:scale-105 light:border-slate-200 light:text-slate-700"
                aria-label="Logout"
              >
                <LogOut size={18} />
              </button>
            </div>
          </div>
        </header>
        <motion.main
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
          className="p-4 md:p-6"
        >
          <Outlet />
        </motion.main>
      </div>
    </div>
  );
}
