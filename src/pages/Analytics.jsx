import ChartCard from '../components/ChartCard.jsx';
import { Button, PageHeader, Select } from '../components/ui.jsx';
import { hourlyCongestion, junctions, vehicleDistribution } from '../data/mockData.js';

export default function Analytics() {
  return (
    <>
      <PageHeader
        title="Analytics & Prediction"
        subtitle="Traffic trends, peak hours, vehicle mix, predicted congestion, emergency response, and carbon impact."
        action={<div className="flex flex-wrap gap-2"><Button variant="ghost">Today</Button><Button variant="ghost">Week</Button><Button variant="ghost">Month</Button><Select><option>All Junctions</option>{junctions.map((j) => <option key={j.id}>{j.name}</option>)}</Select></div>}
      />
      <div className="grid gap-6 xl:grid-cols-2">
        <ChartCard title="Hourly Congestion Trends">
          <BarRows data={hourlyCongestion} valueKey="congestion" suffix="%" color="bg-cyan-300" />
        </ChartCard>
        <ChartCard title="Predicted Congestion Next 30 Minutes">
          <LineLike data={hourlyCongestion} />
        </ChartCard>
        <ChartCard title="Vehicle Type Distribution">
          <DonutLegend data={vehicleDistribution} />
        </ChartCard>
        <ChartCard title="Emergency Response & CO2 Reduction">
          <BarRows data={hourlyCongestion} valueKey="wait" suffix=" min wait" color="bg-emerald-300" scale={10} />
        </ChartCard>
      </div>
    </>
  );
}

function BarRows({ data, valueKey, suffix, color, scale = 1 }) {
  const max = Math.max(...data.map((item) => item[valueKey] * scale));
  return (
    <div className="space-y-4">
      {data.map((item) => {
        const value = item[valueKey] * scale;
        return (
          <div key={item.time} className="grid grid-cols-[58px_1fr_80px] items-center gap-3 text-sm">
            <span className="text-slate-400 light:text-slate-600">{item.time}</span>
            <div className="h-3 rounded-full bg-slate-800 light:bg-slate-200">
              <div className={`h-3 rounded-full ${color}`} style={{ width: `${(value / max) * 100}%` }} />
            </div>
            <span className="text-right font-semibold">{item[valueKey]}{suffix}</span>
          </div>
        );
      })}
    </div>
  );
}

function LineLike({ data }) {
  return (
    <div className="flex h-56 items-end gap-3 border-b border-l border-white/10 px-4 light:border-slate-200">
      {data.map((item) => (
        <div key={item.time} className="flex flex-1 flex-col items-center gap-2">
          <div className="relative flex h-44 w-full items-end justify-center">
            <div className="w-3 rounded-t-full bg-cyan-300" style={{ height: `${item.congestion}%` }} />
            <div className="ml-1 w-3 rounded-t-full bg-rose-300" style={{ height: `${item.predicted}%` }} />
          </div>
          <span className="text-xs text-slate-400 light:text-slate-600">{item.time}</span>
        </div>
      ))}
    </div>
  );
}

function DonutLegend({ data }) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const colors = ['bg-cyan-300', 'bg-violet-300', 'bg-emerald-300', 'bg-amber-300', 'bg-rose-300'];
  return (
    <div className="grid gap-5 md:grid-cols-[180px_1fr]">
      <div className="flex h-44 w-44 items-center justify-center rounded-full bg-[conic-gradient(#67e8f9_0_39%,#c4b5fd_39%_86%,#6ee7b7_86%_92%,#fcd34d_92%_99%,#fda4af_99%_100%)]">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-950 text-center text-sm font-bold light:bg-white">
          {total}<br />vehicles
        </div>
      </div>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between rounded-2xl bg-white/5 p-3 light:bg-slate-100">
            <span className="flex items-center gap-2"><span className={`h-3 w-3 rounded-full ${colors[index]}`} />{item.name}</span>
            <span className="font-bold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
