import { useState } from 'react';
import { Camera, Car, CircleDot, Clock, RadioTower } from 'lucide-react';
import { Button, Card, Input, PageHeader } from '../components/ui.jsx';
import { useAppStore } from '../store/useAppStore.js';
import { calculateTpi, signalFromTpi, statusColor, vehicleTotal } from '../utils/tpi.js';

export default function LiveJunction() {
  const junctions = useAppStore((state) => state.junctions);
  const user = useAppStore((state) => state.user);
  const [search, setSearch] = useState('');
  const filtered = junctions.filter((junction) => junction.name.toLowerCase().includes(search.toLowerCase()));
  const canOverride = ['Traffic Police', 'Admin'].includes(user?.role);

  return (
    <>
      <PageHeader title="Live Junction Status" subtitle="Camera simulation, vehicle mix, signal state, timer, wait pressure, and manual controls." />
      <Input placeholder="Search junction by name" value={search} onChange={(e) => setSearch(e.target.value)} />
      <div className="mt-6 grid gap-5 lg:grid-cols-2">
        {filtered.map((junction) => {
          const tpi = calculateTpi(junction);
          const signal = signalFromTpi(tpi);
          return (
            <Card key={junction.id}>
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h2 className="text-xl font-bold">{junction.name}</h2>
                  <p className="text-sm text-slate-400 light:text-slate-600">{junction.area}</p>
                </div>
                <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusColor(signal)}`}>{signal}</span>
              </div>
              <div className="mt-5 flex h-40 items-center justify-center overflow-hidden rounded-2xl border border-white/10 bg-slate-900 light:border-slate-200 light:bg-slate-200">
                <div className="text-center">
                  <Camera className="mx-auto mb-2 text-cyan-300" size={36} />
                  <p className="text-sm text-slate-400 light:text-slate-600">Live camera feed placeholder</p>
                </div>
              </div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <Metric icon={Car} label="Vehicles" value={vehicleTotal(junction.vehicles)} />
                <Metric icon={Clock} label="Wait" value={`${junction.wait}m`} />
                <Metric icon={CircleDot} label="TPI" value={tpi} />
              </div>
              <div className="mt-5 grid grid-cols-5 gap-2 text-center text-xs">
                {Object.entries(junction.vehicles).map(([type, count]) => (
                  <div key={type} className="rounded-xl bg-white/5 p-3 light:bg-slate-100">
                    <div className="font-bold text-cyan-300">{count}</div>
                    <div className="capitalize text-slate-400 light:text-slate-600">{type}</div>
                  </div>
                ))}
              </div>
              <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
                <div className="text-sm text-slate-400 light:text-slate-600">Signal timer: {junction.timer}s | Congestion: {junction.congestion}%</div>
                {canOverride && (
                  <div className="flex gap-2">
                    {['Green', 'Amber', 'Red'].map((color) => <Button key={color} variant="ghost">{color}</Button>)}
                  </div>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}

function Metric({ icon: Icon, label, value }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-3 light:border-slate-200">
      <Icon className="mb-2 text-cyan-300" size={18} />
      <div className="text-lg font-bold">{value}</div>
      <div className="text-xs text-slate-400 light:text-slate-600">{label}</div>
    </div>
  );
}
