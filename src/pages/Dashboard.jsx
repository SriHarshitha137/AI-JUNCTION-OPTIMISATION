import { useEffect, useMemo, useState } from 'react';
import { Ambulance, Clock, Cloud, Gauge, MapPinned, Route, ShieldAlert, Timer, TrafficCone } from 'lucide-react';
import { motion } from 'framer-motion';
import CityMap from '../components/CityMap.jsx';
import IncidentForm from '../components/IncidentForm.jsx';
import { Button, Card, Input, KpiCard, PageHeader, Select } from '../components/ui.jsx';
import { routes } from '../data/mockData.js';
import { useAppStore } from '../store/useAppStore.js';
import { calculateTpi, vehicleTotal } from '../utils/tpi.js';

export default function Dashboard() {
  const junctions = useAppStore((state) => state.junctions);
  const emergency = useAppStore((state) => state.emergency);
  const activateEmergency = useAppStore((state) => state.activateEmergency);
  const restoreEmergency = useAppStore((state) => state.restoreEmergency);
  const tickSimulation = useAppStore((state) => state.tickSimulation);
  const [routeResult, setRouteResult] = useState(null);
  const [current, setCurrent] = useState('');
  const [destination, setDestination] = useState('City Hospital');
  const [vehicle, setVehicle] = useState('Ambulance');

  useEffect(() => {
    const timer = setInterval(() => {
      tickSimulation();
      if (emergency.active && emergency.timer <= 1) restoreEmergency();
    }, 1000);
    return () => clearInterval(timer);
  }, [emergency.active, emergency.timer, restoreEmergency, tickSimulation]);

  const stats = useMemo(() => {
    const totalVehicles = junctions.reduce((sum, junction) => sum + vehicleTotal(junction.vehicles), 0);
    const avgCongestion = Math.round(junctions.reduce((sum, junction) => sum + junction.congestion, 0) / junctions.length);
    const avgWait = (junctions.reduce((sum, junction) => sum + junction.wait, 0) / junctions.length).toFixed(1);
    const avgTpi = Math.round(junctions.reduce((sum, junction) => sum + calculateTpi(junction), 0) / junctions.length);
    return { totalVehicles, avgCongestion, avgWait, avgTpi };
  }, [junctions]);

  const locate = () => {
    if (!navigator.geolocation) {
      setCurrent('Geolocation unavailable');
      return;
    }
    navigator.geolocation.getCurrentPosition(
      (position) => setCurrent(`${position.coords.latitude.toFixed(4)}, ${position.coords.longitude.toFixed(4)}`),
      () => setCurrent('MG Road, Bengaluru'),
    );
  };

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Live city overview, TPI signal intelligence, emergency control, and route search in one command surface." />
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        <KpiCard label="Total Junctions" value={junctions.length} icon={TrafficCone} />
        <KpiCard label="Avg City Congestion" value={`${stats.avgCongestion}%`} icon={Gauge} accent="amber" />
        <KpiCard label="Vehicles on Road" value={stats.totalVehicles.toLocaleString()} icon={MapPinned} accent="emerald" />
        <KpiCard label="Avg Wait Time" value={`${stats.avgWait}m`} icon={Clock} accent="purple" />
        <KpiCard label="CO2 Saved" value="1.8t" icon={Cloud} accent="cyan" />
        <KpiCard label="Avg TPI" value={stats.avgTpi} icon={Timer} accent="rose" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.5fr_.9fr]">
        <Card className="min-h-[470px]">
          <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-bold">City Map Overview</h2>
              <p className="text-sm text-slate-400 light:text-slate-600">Heat rings: green low, yellow moderate, red heavy traffic.</p>
            </div>
            {emergency.active && <span className="rounded-full bg-rose-500 px-3 py-1 text-sm font-bold">Corridor active {emergency.timer}s</span>}
          </div>
          <div className="h-[380px]">
            <CityMap junctions={junctions} emergencyActive={emergency.active} />
          </div>
        </Card>

        <div className="space-y-6">
          <Card>
            <h2 className="text-xl font-bold">Find Optimal Route</h2>
            <div className="mt-4 space-y-3">
              <div className="flex gap-2">
                <Input value={current} onChange={(e) => setCurrent(e.target.value)} placeholder="Current location" />
                <Button variant="ghost" onClick={locate}>Locate</Button>
              </div>
              <Input value={destination} onChange={(e) => setDestination(e.target.value)} placeholder="Destination" />
              <Button onClick={() => setRouteResult(routes[1])}><Route size={18} /> Find Optimal Route</Button>
              {routeResult && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-4">
                  <div className="font-bold text-cyan-100 light:text-cyan-800">{routeResult.name}</div>
                  <div className="mt-2 text-sm text-slate-300 light:text-slate-700">
                    ETA {routeResult.time} min, congestion {routeResult.congestion}%, TPI {routeResult.tpi}
                  </div>
                  <p className="mt-3 text-sm text-slate-300 light:text-slate-700">{routeResult.note}</p>
                </motion.div>
              )}
            </div>
          </Card>

          <Card>
            <h2 className="text-xl font-bold">Emergency Corridor</h2>
            <div className="mt-4 flex gap-3">
              <Select value={vehicle} onChange={(e) => setVehicle(e.target.value)}>
                <option>Ambulance</option>
                <option>Fire Truck</option>
                <option>Police</option>
              </Select>
              <Button variant="danger" onClick={() => activateEmergency(vehicle)}><Ambulance size={18} /> Activate</Button>
            </div>
          </Card>
        </div>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-2">
          <h2 className="text-xl font-bold">Traffic Pressure Index</h2>
          <p className="mt-2 text-sm text-slate-400 light:text-slate-600">
            TPI = Vehicle Count x 0.4 + Average Waiting Time x 0.3 + Emergency Priority x 0.2 + Predicted Incoming Traffic x 0.1
          </p>
          <div className="mt-4 grid gap-3 md:grid-cols-2">
            {junctions.slice(0, 4).map((junction) => (
              <div key={junction.id} className="rounded-2xl border border-white/10 bg-white/5 p-4 light:border-slate-200">
                <div className="flex items-center justify-between">
                  <span className="font-semibold">{junction.name}</span>
                  <span className="text-cyan-300">{calculateTpi(junction)}</span>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-800 light:bg-slate-200">
                  <div className="h-2 rounded-full bg-gradient-to-r from-cyan-300 to-emerald-300" style={{ width: `${calculateTpi(junction)}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="mb-4 text-xl font-bold">Report Accident/Event</h2>
          <IncidentForm compact />
        </Card>
      </div>
    </>
  );
}
