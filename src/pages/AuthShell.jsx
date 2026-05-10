import { Link } from 'react-router-dom';
import { TrafficCone } from 'lucide-react';

export default function AuthShell({ title, subtitle, children, footer }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-950 px-4 py-10 text-white light:bg-slate-100 light:text-slate-950">
      <div className="absolute inset-0 traffic-grid opacity-50 light:opacity-20" />
      <div className="glass relative z-10 w-full max-w-md rounded-2xl p-7">
        <Link to="/" className="mb-6 flex items-center gap-3">
          <div className="rounded-2xl bg-cyan-400 p-2 text-slate-950">
            <TrafficCone />
          </div>
          <span className="font-bold">AI Junction</span>
        </Link>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-sm text-slate-400 light:text-slate-600">{subtitle}</p>
        <div className="mt-6">{children}</div>
        {footer && <div className="mt-6 text-center text-sm text-slate-400 light:text-slate-600">{footer}</div>}
      </div>
    </div>
  );
}
