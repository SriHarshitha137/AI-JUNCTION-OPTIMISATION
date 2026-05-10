import CityMap from '../components/CityMap.jsx';
import IncidentForm from '../components/IncidentForm.jsx';
import { Card, PageHeader } from '../components/ui.jsx';
import { useAppStore } from '../store/useAppStore.js';
import { statusColor } from '../utils/tpi.js';

export default function ReportIncidents() {
  const incidents = useAppStore((state) => state.incidents);
  const junctions = useAppStore((state) => state.junctions);
  return (
    <>
      <PageHeader title="Report Incidents" subtitle="Submit accidents, road work, breakdowns, and signal failures into the city response queue." />
      <div className="grid gap-6 xl:grid-cols-[.8fr_1.2fr]">
        <Card>
          <h2 className="mb-4 text-xl font-bold">Incident Submission</h2>
          <IncidentForm />
        </Card>
        <Card>
          <h2 className="mb-4 text-xl font-bold">Incident Map</h2>
          <div className="h-[360px]"><CityMap junctions={junctions} /></div>
        </Card>
      </div>
      <Card className="mt-6">
        <h2 className="mb-4 text-xl font-bold">Recent Incidents</h2>
        <div className="grid gap-3">
          {incidents.map((incident) => (
            <div key={incident.id} className="flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 light:border-slate-200">
              <div>
                <div className="font-semibold">{incident.type} at {incident.location || 'Unknown location'}</div>
                <div className="text-sm text-slate-400 light:text-slate-600">{incident.description || incident.status} | {incident.time}</div>
              </div>
              <span className={`rounded-full border px-3 py-1 text-xs font-bold ${statusColor(incident.severity)}`}>{incident.severity}</span>
            </div>
          ))}
        </div>
      </Card>
    </>
  );
}
