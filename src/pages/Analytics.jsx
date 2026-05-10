import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Clock, Flame, ShieldCheck, TrendingUp } from 'lucide-react';
import ChartCard from '../components/ChartCard.jsx';
import { Button, KpiCard, PageHeader, Select } from '../components/ui.jsx';
import { junctions } from '../data/mockData.js';

const analyticsData = {
  today: {
    kpis: [
      { label: 'Peak Congestion', value: '78%', icon: Flame, accent: 'rose', detail: '2.3% above average' },
      { label: 'Emergency Response', value: '5.4m', icon: ShieldCheck, accent: 'emerald', detail: 'Optimized route coverage' },
      { label: 'Vehicle Flow', value: '18.2k', icon: TrendingUp, accent: 'cyan', detail: 'Citywide throughput' },
    ],
    hourlyCongestion: [
      { time: '6 AM', congestion: 29, predicted: 34, wait: 2.1 },
      { time: '8 AM', congestion: 74, predicted: 79, wait: 6.5 },
      { time: '10 AM', congestion: 67, predicted: 61, wait: 5.1 },
      { time: '12 PM', congestion: 52, predicted: 55, wait: 3.9 },
      { time: '2 PM', congestion: 57, predicted: 63, wait: 4.5 },
      { time: '4 PM', congestion: 71, predicted: 77, wait: 6.8 },
      { time: '6 PM', congestion: 88, predicted: 91, wait: 8.5 },
      { time: '8 PM', congestion: 63, predicted: 58, wait: 5.2 },
    ],
    vehicleDistribution: [
      { name: 'Cars', value: 582 },
      { name: 'Bikes', value: 742 },
      { name: 'Buses', value: 98 },
      { name: 'Trucks', value: 112 },
      { name: 'Ambulances', value: 8 },
    ],
    emergencyWait: 5.4,
  },
  week: {
    kpis: [
      { label: 'Avg Congestion', value: '64%', icon: Flame, accent: 'amber', detail: 'Strong signal coordination' },
      { label: 'Incident Response', value: '6.1m', icon: ShieldCheck, accent: 'emerald', detail: 'Emergency corridor stable' },
      { label: 'Traffic Volume', value: '112k', icon: TrendingUp, accent: 'cyan', detail: 'Weekly peak flow' },
    ],
    hourlyCongestion: [
      { time: 'Mon', congestion: 52, predicted: 58, wait: 4.2 },
      { time: 'Tue', congestion: 61, predicted: 64, wait: 4.8 },
      { time: 'Wed', congestion: 67, predicted: 70, wait: 5.3 },
      { time: 'Thu', congestion: 71, predicted: 74, wait: 5.9 },
      { time: 'Fri', congestion: 79, predicted: 84, wait: 6.8 },
      { time: 'Sat', congestion: 58, predicted: 61, wait: 4.4 },
      { time: 'Sun', congestion: 49, predicted: 53, wait: 3.6 },
      { time: 'Mon', congestion: 55, predicted: 59, wait: 4.1 },
    ],
    vehicleDistribution: [
      { name: 'Cars', value: 4120 },
      { name: 'Bikes', value: 5620 },
      { name: 'Buses', value: 610 },
      { name: 'Trucks', value: 920 },
      { name: 'Ambulances', value: 32 },
    ],
    emergencyWait: 6.1,
  },
  month: {
    kpis: [
      { label: 'Average Delay', value: '5.9m', icon: Clock, accent: 'purple', detail: 'Target response achieved' },
      { label: 'Congestion Index', value: '59%', icon: Flame, accent: 'rose', detail: 'Improving by 3.1%' },
      { label: 'Flow Rate', value: '487k', icon: TrendingUp, accent: 'cyan', detail: 'Sustained city performance' },
    ],
    hourlyCongestion: [
      { time: 'Week 1', congestion: 58, predicted: 64, wait: 5.0 },
      { time: 'Week 2', congestion: 62, predicted: 67, wait: 5.4 },
      { time: 'Week 3', congestion: 65, predicted: 69, wait: 5.7 },
      { time: 'Week 4', congestion: 60, predicted: 63, wait: 5.2 },
      { time: 'Week 5', congestion: 56, predicted: 58, wait: 4.9 },
      { time: 'Week 6', congestion: 61, predicted: 66, wait: 5.3 },
      { time: 'Week 7', congestion: 64, predicted: 68, wait: 5.6 },
      { time: 'Week 8', congestion: 59, predicted: 61, wait: 5.1 },
    ],
    vehicleDistribution: [
      { name: 'Cars', value: 20300 },
      { name: 'Bikes', value: 27100 },
      { name: 'Buses', value: 2980 },
      { name: 'Trucks', value: 4280 },
      { name: 'Ambulances', value: 137 },
    ],
    emergencyWait: 5.9,
  },
};

export default function Analytics() {
  const [selectedPeriod, setSelectedPeriod] = useState('today');
  const [selectedJunction, setSelectedJunction] = useState('All Junctions');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    const timer = window.setTimeout(() => setLoading(false), 260);
    return () => window.clearTimeout(timer);
  }, [selectedPeriod, selectedJunction]);

  const currentData = useMemo(() => {
    const base = analyticsData[selectedPeriod];
    if (selectedJunction === 'All Junctions') return base;
    const junction = junctions.find((item) => item.name === selectedJunction);
    if (!junction) return base;

    const congestionShift = (junction.congestion - 65) * 0.33;
    const predictedShift = (junction.predicted - 65) * 0.3;
    const waitShift = (junction.wait - 5.5) * 0.8;
    const vehicleScale = 0.8 + Math.min(0.35, Math.max(-0.18, Object.values(junction.vehicles).reduce((sum, v) => sum + v, 0) / 3400));

    return {
      ...base,
      kpis: base.kpis.map((item) => ({ ...item })),
      hourlyCongestion: base.hourlyCongestion.map((item) => ({
        ...item,
        congestion: Math.min(100, Math.max(10, Math.round(item.congestion + congestionShift))),
        predicted: Math.min(100, Math.max(10, Math.round(item.predicted + predictedShift))),
        wait: Math.max(1.1, Number((item.wait + waitShift).toFixed(1))),
      })),
      vehicleDistribution: base.vehicleDistribution.map((item) => ({
        ...item,
        value: Math.max(3, Math.round(item.value * vehicleScale)),
      })),
      emergencyWait: Math.max(1.5, Number((base.emergencyWait + waitShift).toFixed(1))),
    };
  }, [selectedPeriod, selectedJunction]);

  return (
    <>
      <PageHeader
        title="Analytics & Prediction"
        subtitle="Traffic trends, peak hours, vehicle mix, predicted congestion, emergency response, and carbon impact."
        action={
          <div className="flex flex-wrap items-center gap-2">
            {['today', 'week', 'month'].map((period) => (
              <Button
                key={period}
                variant={selectedPeriod === period ? 'primary' : 'ghost'}
                onClick={() => setSelectedPeriod(period)}
              >
                {period.charAt(0).toUpperCase() + period.slice(1)}
              </Button>
            ))}
            <Select
              value={selectedJunction}
              onChange={(event) => setSelectedJunction(event.target.value)}
              aria-label="Select junction"
            >
              <option>All Junctions</option>
              {junctions.map((j) => (
                <option key={j.id}>{j.name}</option>
              ))}
            </Select>
          </div>
        }
      />

      <div className="grid gap-6 xl:grid-cols-3">
        {currentData.kpis.map((item) => (
          <KpiCard key={item.label} label={item.label} value={item.value} icon={item.icon} accent={item.accent} detail={item.detail} />
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={`${selectedPeriod}-${selectedJunction}`}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: 'easeOut' }}
          className="mt-6 grid gap-6 xl:grid-cols-2"
        >
          <ChartCard title="Hourly Congestion Trends">
            {loading ? <SkeletonRows rows={6} /> : <BarRows data={currentData.hourlyCongestion} valueKey="congestion" suffix="%" color="bg-cyan-300" />}
          </ChartCard>

          <ChartCard title="Predicted Congestion Next 30 Minutes">
            {loading ? <SkeletonChart /> : <LineLike data={currentData.hourlyCongestion} />}
          </ChartCard>

          <ChartCard title="Vehicle Type Distribution">
            {loading ? <SkeletonDonut /> : <DonutLegend data={currentData.vehicleDistribution} />}
          </ChartCard>

          <ChartCard title="Emergency Response & CO2 Reduction">
            {loading ? <SkeletonRows rows={4} /> : <BarRows data={currentData.hourlyCongestion} valueKey="wait" suffix=" min" color="bg-emerald-300" scale={10} />}
          </ChartCard>
        </motion.div>
      </AnimatePresence>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Active Junction</h2>
              <p className="mt-1 text-sm text-slate-400 light:text-slate-600">Current focus for {selectedJunction}.</p>
            </div>
            <div className="rounded-2xl bg-slate-900/70 px-3 py-1 text-sm text-slate-100 light:bg-slate-100 light:text-slate-900">
              {selectedPeriod.charAt(0).toUpperCase() + selectedPeriod.slice(1)} view
            </div>
          </div>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center light:border-slate-200 light:bg-slate-50">
              <div className="text-sm text-slate-400 light:text-slate-600">Avg Wait</div>
              <div className="mt-2 text-3xl font-bold text-white light:text-slate-950">{currentData.emergencyWait}m</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center light:border-slate-200 light:bg-slate-50">
              <div className="text-sm text-slate-400 light:text-slate-600">Forecast confidence</div>
              <div className="mt-2 text-3xl font-bold text-white light:text-slate-950">{Math.max(79, 92 - selectedPeriod.length * 3)}%</div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-center light:border-slate-200 light:bg-slate-50">
              <div className="text-sm text-slate-400 light:text-slate-600">Junction impact</div>
              <div className="mt-2 text-3xl font-bold text-white light:text-slate-950">{selectedJunction === 'All Junctions' ? 'Citywide' : 'Localized'}</div>
            </div>
          </div>
        </div>
        <div className="glass rounded-2xl p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold">Performance Indicators</h2>
              <p className="mt-1 text-sm text-slate-400 light:text-slate-600">Charts and cards refresh when filters change.</p>
            </div>
            <div className="flex items-center gap-2 rounded-full bg-slate-800/70 px-3 py-1 text-xs text-slate-200 light:bg-slate-100 light:text-slate-900">
              <ArrowUpRight size={14} /> Dynamic refresh
            </div>
          </div>

          <div className="mt-5 space-y-4">
            <ProgressRow label="Signal coordination" value={selectedPeriod === 'month' ? 92 : selectedPeriod === 'week' ? 88 : 95} />
            <ProgressRow label="AI predictions" value={selectedPeriod === 'month' ? 86 : selectedPeriod === 'week' ? 89 : 93} />
            <ProgressRow label="Emergency readiness" value={selectedPeriod === 'month' ? 84 : selectedPeriod === 'week' ? 87 : 90} />
          </div>
        </div>
      </div>
    </>
  );
}

function ProgressRow({ label, value }) {
  return (
    <div>
      <div className="flex items-center justify-between text-sm text-slate-400 light:text-slate-600">
        <span>{label}</span>
        <span className="font-semibold text-white light:text-slate-950">{value}%</span>
      </div>
      <div className="mt-2 h-3 overflow-hidden rounded-full bg-slate-800 light:bg-slate-200">
        <div className="h-3 rounded-full bg-gradient-to-r from-cyan-400 to-emerald-300 transition-all duration-500" style={{ width: `${value}%` }} />
      </div>
    </div>
  );
}

function BarRows({ data, valueKey, suffix, color, scale = 1 }) {
  const max = Math.max(...data.map((item) => item[valueKey] * scale));
  return (
    <div className="space-y-4">
      {data.map((item) => {
        const value = item[valueKey] * scale;
        return (
          <div key={item.time} className="grid grid-cols-[72px_1fr_80px] items-center gap-3 text-sm">
            <span className="text-slate-400 light:text-slate-600">{item.time}</span>
            <div className="h-3 rounded-full bg-slate-800 light:bg-slate-200">
              <div className={`h-3 rounded-full ${color} transition-all duration-500`} style={{ width: `${(value / max) * 100}%` }} />
            </div>
            <span className="text-right font-semibold text-white light:text-slate-950">{item[valueKey]}{suffix}</span>
          </div>
        );
      })}
    </div>
  );
}

function LineLike({ data }) {
  return (
    <div className="flex h-56 items-end gap-3 rounded-3xl border border-white/10 bg-slate-950/60 px-3 py-4 light:border-slate-200 light:bg-slate-50">
      {data.map((item) => (
        <div key={item.time} className="flex flex-1 flex-col items-center gap-2">
          <div className="flex h-44 w-full items-end justify-center gap-2">
            <div className="flex h-full w-3 flex-col justify-end rounded-full bg-slate-900/70 light:bg-slate-200">
              <div className="rounded-full bg-cyan-300 transition-all duration-500" style={{ height: `${item.congestion}%` }} />
            </div>
            <div className="flex h-full w-3 flex-col justify-end rounded-full bg-slate-900/70 light:bg-slate-200">
              <div className="rounded-full bg-rose-300 transition-all duration-500" style={{ height: `${item.predicted}%` }} />
            </div>
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
      <div className="relative flex h-44 w-44 items-center justify-center rounded-full bg-[conic-gradient(#67e8f9_0_35%,#c4b5fd_35%_80%,#6ee7b7_80%_90%,#fcd34d_90%_97%,#fda4af_97%_100%)] shadow-[0_16px_50px_-30px_rgba(56,189,248,0.7)]">
        <div className="flex h-24 w-24 items-center justify-center rounded-full bg-slate-950 text-center text-sm font-bold text-white light:bg-white light:text-slate-950">
          {total}
          <span className="block text-[10px] font-medium text-slate-400 light:text-slate-500">vehicles</span>
        </div>
      </div>
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center justify-between rounded-2xl bg-white/5 p-3 transition hover:bg-white/10 light:bg-slate-100 light:hover:bg-slate-200">
            <span className="flex items-center gap-2 text-sm text-white light:text-slate-950">
              <span className={`h-3 w-3 rounded-full ${colors[index]}`} />
              {item.name}
            </span>
            <span className="font-semibold text-white light:text-slate-950">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function SkeletonRows({ rows = 5 }) {
  return (
    <div className="space-y-3">
      {Array.from({ length: rows }).map((_, index) => (
        <div key={index} className="flex items-center gap-3">
          <div className="h-3 w-16 rounded-full bg-slate-800 light:bg-slate-200" />
          <div className="h-3 flex-1 rounded-full bg-slate-800 light:bg-slate-200" />
          <div className="h-3 w-20 rounded-full bg-slate-800 light:bg-slate-200" />
        </div>
      ))}
    </div>
  );
}

function SkeletonChart() {
  return <div className="h-56 rounded-3xl bg-slate-900/70 light:bg-slate-100" />;
}

function SkeletonDonut() {
  return <div className="h-72 rounded-3xl bg-slate-900/70 light:bg-slate-100" />;
}
