import { useState } from 'react';
import { Button, Input, Select } from './ui.jsx';
import { useAppStore } from '../store/useAppStore.js';

export default function IncidentForm({ compact = false }) {
  const addIncident = useAppStore((state) => state.addIncident);
  const [form, setForm] = useState({ type: 'Accident', severity: 'Medium', location: '', description: '' });
  const [submitted, setSubmitted] = useState(false);

  const update = (key, value) => setForm((current) => ({ ...current, [key]: value }));

  return (
    <form
      className="space-y-3"
      onSubmit={(event) => {
        event.preventDefault();
        addIncident(form);
        setSubmitted(true);
      }}
    >
      <div className={compact ? 'grid gap-3 md:grid-cols-2' : 'space-y-3'}>
        <Select value={form.type} onChange={(event) => update('type', event.target.value)}>
          <option>Accident</option>
          <option>Road work</option>
          <option>Signal failure</option>
          <option>Vehicle breakdown</option>
        </Select>
        <Select value={form.severity} onChange={(event) => update('severity', event.target.value)}>
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
          <option>Critical</option>
        </Select>
      </div>
      <Input placeholder="Location or junction name" value={form.location} onChange={(event) => update('location', event.target.value)} required />
      <textarea
        className="min-h-24 w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-300 light:border-slate-200 light:bg-white light:text-slate-950"
        placeholder="Describe the incident"
        value={form.description}
        onChange={(event) => update('description', event.target.value)}
      />
      <Input type="file" />
      <Button type="submit">Submit incident</Button>
      {submitted && <p className="text-sm text-emerald-300">Incident submitted to the command queue.</p>}
    </form>
  );
}
