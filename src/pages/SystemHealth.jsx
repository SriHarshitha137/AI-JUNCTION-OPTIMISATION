import { Activity, Cpu, Database, Radio, Server, Video } from 'lucide-react';
import { Card, PageHeader } from '../components/ui.jsx';
import { healthMetrics } from '../data/mockData.js';
import { statusColor } from '../utils/tpi.js';

const icons = [Video, Activity, Radio, Server, Cpu, Database];

export default function SystemHealth() {
  return (
    <>
      <PageHeader title="System Health" subtitle="Traffic Police/Admin view for cameras, sensors, AI accuracy, uptime, server load, and database status." />
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {healthMetrics.map((metric, index) => {
          const Icon = icons[index];
          return (
            <Card key={metric.label}>
              <div className="flex items-start justify-between">
                <Icon className="text-cyan-300" size={30} />
                <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusColor(metric.status)}`}>{metric.status}</span>
              </div>
              <div className="mt-6 text-3xl font-black">{metric.value}</div>
              <div className="mt-1 text-sm text-slate-400 light:text-slate-600">{metric.label}</div>
            </Card>
          );
        })}
      </div>
      <Card className="mt-6">
        <h2 className="text-xl font-bold">Operational Notes</h2>
        <div className="mt-4 grid gap-3 md:grid-cols-3">
          {['Two cameras need lens cleaning', 'AI model retrained 18 minutes ago', 'All emergency APIs responding normally'].map((note) => (
            <div key={note} className="rounded-2xl bg-white/5 p-4 text-sm text-slate-300 light:bg-slate-100 light:text-slate-700">{note}</div>
          ))}
        </div>
      </Card>
    </>
  );
}
