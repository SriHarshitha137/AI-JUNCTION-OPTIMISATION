import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';

export function PageHeader({ title, subtitle, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="mb-6 flex flex-col gap-4 md:flex-row md:items-end md:justify-between"
    >
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.22em] text-cyan-300">Smart traffic command</p>
        <h1 className="mt-2 text-3xl font-bold text-white light:text-slate-950">{title}</h1>
        {subtitle && <p className="mt-2 max-w-3xl text-sm text-slate-300 light:text-slate-600">{subtitle}</p>}
      </div>
      {action}
    </motion.div>
  );
}

export function Card({ children, className = '' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className={`glass rounded-2xl p-5 transition-shadow duration-300 ${className}`}
    >
      {children}
    </motion.div>
  );
}

export function ThemedCard(props) {
  return <Card {...props} />;
}

const buttonVariants = {
  primary:
    'bg-gradient-to-r from-cyan-400 to-sky-300 text-slate-950 shadow-[0_18px_32px_-18px_rgba(56,189,248,0.9)] hover:scale-[1.02] hover:shadow-[0_22px_40px_-18px_rgba(56,189,248,0.95)]',
  ghost:
    'border border-white/10 bg-white/5 text-white hover:bg-white/15 light:border-slate-200 light:bg-slate-100 light:text-slate-900 light:hover:bg-slate-200',
  danger:
    'bg-rose-500 text-white shadow-[0_12px_30px_rgba(244,63,94,0.25)] hover:bg-rose-400 hover:shadow-[0_16px_32px_rgba(244,63,94,0.32)]',
};

export function Button({ children, variant = 'primary', className = '', ...props }) {
  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ duration: 0.18 }}
      className={`relative inline-flex items-center justify-center overflow-hidden rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-300 disabled:cursor-not-allowed disabled:opacity-50 ${buttonVariants[variant]} ${className}`}
      {...props}
    >
      {children}
      <span className="ripple absolute inset-0 opacity-0" />
    </motion.button>
  );
}

export function ThemedButton(props) {
  return <Button {...props} />;
}

const accentStyles = {
  cyan: 'bg-cyan-400/10 text-cyan-300',
  emerald: 'bg-emerald-400/10 text-emerald-300',
  rose: 'bg-rose-400/10 text-rose-300',
  amber: 'bg-amber-400/10 text-amber-300',
  purple: 'bg-violet-400/10 text-violet-300',
};

const badgeStyles = {
  cyan: 'border-cyan-400/30 bg-cyan-400/10 text-cyan-200 light:text-cyan-700',
  emerald: 'border-emerald-400/30 bg-emerald-400/10 text-emerald-200 light:text-emerald-700',
  rose: 'border-rose-400/30 bg-rose-400/10 text-rose-200 light:text-rose-700',
  amber: 'border-amber-400/30 bg-amber-400/10 text-amber-200 light:text-amber-700',
  purple: 'border-violet-400/30 bg-violet-400/10 text-violet-200 light:text-violet-700',
};

export function KpiCard({ label, value, icon: Icon, accent = 'cyan', detail }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.45, ease: 'easeOut' }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-center justify-between">
        <div className={`rounded-2xl p-3 ${accentStyles[accent] ?? accentStyles.cyan}`}>
          <Icon size={22} />
        </div>
        <ArrowUpRight className="text-slate-400 light:text-slate-500" size={18} />
      </div>
      <div className="mt-4">
        <div className="text-2xl font-bold text-white light:text-slate-950">{value}</div>
        <div className="mt-1 text-sm text-slate-400 light:text-slate-600">{label}</div>
        {detail && <div className="mt-3 text-xs text-cyan-200 light:text-cyan-700">{detail}</div>}
      </div>
    </motion.div>
  );
}

export function Badge({ children, color = 'cyan' }) {
  return (
    <span className={`inline-flex rounded-full border px-3 py-1 text-xs font-semibold ${badgeStyles[color] ?? badgeStyles.cyan}`}>
      {children}
    </span>
  );
}

const inputBase =
  'w-full rounded-xl border px-4 py-3 text-sm outline-none transition duration-200 placeholder:text-slate-500 focus:ring-2 focus:ring-cyan-300';

export function Input(props) {
  return (
    <input
      className={`${inputBase} border-white/10 bg-white/5 text-white light:border-slate-200 light:bg-white light:text-slate-950`}
      {...props}
    />
  );
}

export function ThemedInput(props) {
  return <Input {...props} />;
}

export function Select(props) {
  return (
    <select
      className={`${inputBase} border-white/10 bg-slate-900/80 text-white light:border-slate-200 light:bg-white light:text-slate-950`}
      {...props}
    />
  );
}
