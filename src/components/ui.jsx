import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function PageHeader({ title, subtitle, action }) {
  return (
    <div className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Smart traffic command</p>
        <h1 className="mt-2 text-3xl font-bold text-white dark:text-white light:text-slate-950">{title}</h1>
        {subtitle && <p className="mt-2 max-w-3xl text-sm text-slate-300 light:text-slate-600">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}

export function Card({ children, className = '' }) {
  return <div className={`glass rounded-2xl p-5 ${className}`}>{children}</div>;
}

export function Button({ children, variant = 'primary', className = '', ...props }) {
  const variants = {
    primary: 'bg-cyan-400 text-slate-950 hover:bg-cyan-300',
    ghost: 'border border-white/10 bg-white/5 text-white hover:bg-white/10 light:border-slate-200 light:text-slate-900 light:hover:bg-slate-100',
    danger: 'bg-rose-500 text-white hover:bg-rose-400 shadow-[0_0_32px_rgba(244,63,94,.45)]',
  };
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition disabled:cursor-not-allowed disabled:opacity-50 ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

export function KpiCard({ label, value, icon: Icon, accent = 'cyan', detail }) {
  return (
    <motion.div whileHover={{ y: -4 }} className="glass rounded-2xl p-5">
      <div className="flex items-center justify-between">
        <div className={`rounded-xl bg-${accent}-400/10 p-3 text-${accent}-300`}>
          <Icon size={22} />
        </div>
        <ArrowUpRight className="text-slate-400" size={18} />
      </div>
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="mt-4">
        <div className="text-2xl font-bold text-white light:text-slate-950">{value}</div>
        <div className="mt-1 text-sm text-slate-400 light:text-slate-600">{label}</div>
        {detail && <div className="mt-3 text-xs text-cyan-200 light:text-cyan-700">{detail}</div>}
      </motion.div>
    </motion.div>
  );
}

export function Badge({ children, color = 'cyan' }) {
  return (
    <span className={`inline-flex rounded-full border border-${color}-400/30 bg-${color}-400/10 px-3 py-1 text-xs font-semibold text-${color}-200 light:text-${color}-700`}>
      {children}
    </span>
  );
}

export function Input(props) {
  return (
    <input
      className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-cyan-300 light:border-slate-200 light:bg-white light:text-slate-950"
      {...props}
    />
  );
}

export function Select(props) {
  return (
    <select
      className="w-full rounded-xl border border-white/10 bg-slate-900/80 px-4 py-3 text-sm text-white outline-none transition focus:border-cyan-300 light:border-slate-200 light:bg-white light:text-slate-950"
      {...props}
    />
  );
}
