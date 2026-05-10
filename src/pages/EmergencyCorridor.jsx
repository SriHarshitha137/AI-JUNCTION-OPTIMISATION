import { useEffect, useState } from 'react';
import { Ambulance, CheckCircle2, Siren } from 'lucide-react';
import CityMap from '../components/CityMap.jsx';
import { Button, Card, Input, PageHeader, Select } from '../components/ui.jsx';
import { useAppStore } from '../store/useAppStore.js';

export default function EmergencyCorridor() {
  const junctions = useAppStore((state) => state.junctions);
  const emergency = useAppStore((state) => state.emergency);
  const activateEmergency = useAppStore((state) => state.activateEmergency);
  const restoreEmergency = useAppStore((state) => state.restoreEmergency);
  const tickSimulation = useAppStore((state) => state.tickSimulation);
  const [type, setType] = useState('Ambulance');

  useEffect(() => {
    const timer = setInterval(() => {
      tickSimulation();
      if (emergency.active && emergency.timer <= 1) restoreEmergency();
    }, 1000);
    return () => clearInterval(timer);
  }, [emergency.active, emergency.timer, restoreEmergency, tickSimulation]);

  return (
    <>
      <PageHeader title="Emergency Corridor" subtitle="Activate a temporary green route for emergency vehicles, then restore regular adaptive signal control." />
      <div className="grid gap-6 xl:grid-cols-[.85fr_1.4fr]">
        <Card>
          <div className="flex items-center gap-3">
            <div className="animate-pulse rounded-2xl bg-rose-500 p-3">
              <Siren />
            </div>
            <div>
              <h2 className="text-xl font-bold">Corridor Control</h2>
              <p className="text-sm text-slate-400 light:text-slate-600">Active status: {emergency.active ? 'Active' : 'Ready'}</p>
            </div>
          </div>
          <div className="mt-5 space-y-3">
            <Select value={type} onChange={(e) => setType(e.target.value)}>
              <option>Ambulance</option>
              <option>Fire Truck</option>
              <option>Police</option>
            </Select>
            <Input placeholder="Current location" defaultValue="Hospital Link Signal" />
            <Input placeholder="Destination" defaultValue="City Trauma Centre" />
            <Button variant="danger" className="w-full" onClick={() => activateEmergency(type)}>
              <Ambulance size={18} /> Activate Corridor
            </Button>
            {emergency.active && <Button variant="ghost" className="w-full" onClick={restoreEmergency}>Restore normal timing</Button>}
          </div>
          <div className="mt-6 rounded-2xl border border-rose-400/25 bg-rose-400/10 p-5 text-center">
            <div className="text-sm text-rose-200 light:text-rose-700">Countdown</div>
            <div className="text-5xl font-black">{emergency.active ? emergency.timer : 0}s</div>
          </div>
        </Card>
        <Card>
          <div className="h-[430px]"><CityMap junctions={junctions} emergencyActive={emergency.active} /></div>
        </Card>
      </div>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        {junctions.slice(0, 4).map((junction, index) => (
          <Card key={junction.id}>
            <CheckCircle2 className="mb-3 text-emerald-300" />
            <h3 className="font-bold">{junction.name}</h3>
            <p className="mt-2 text-sm text-slate-400 light:text-slate-600">Step {index + 1}: Green corridor enabled</p>
          </Card>
        ))}
      </div>
    </>
  );
}
