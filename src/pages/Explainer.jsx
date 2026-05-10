import { BrainCircuit, CheckCircle2, GitBranch, Route, Timer } from 'lucide-react';
import { Card, PageHeader } from '../components/ui.jsx';
import { junctions, routes } from '../data/mockData.js';
import { calculateTpi } from '../utils/tpi.js';

export default function Explainer() {
  const top = [...junctions].sort((a, b) => calculateTpi(b) - calculateTpi(a))[0];
  const explanations = [
    {
      icon: Timer,
      title: 'Signal priority decision',
      text: `${top.name} received extended green time because it has the highest TPI score of ${calculateTpi(top)}, combining vehicle load, wait time, and prediction pressure.`,
      confidence: 94,
    },
    {
      icon: Route,
      title: 'Best path recommendation',
      text: `${routes[1].name} was selected because it reduces travel time by 6 minutes and avoids a high-pressure incident zone.`,
      confidence: 91,
    },
    {
      icon: GitBranch,
      title: 'Smart lane reassignment',
      text: 'One service lane can temporarily support inbound flow because the opposing direction has lower predicted demand for the next 18 minutes.',
      confidence: 87,
    },
    {
      icon: CheckCircle2,
      title: 'Green wave synchronization',
      text: 'Four consecutive junctions are aligned to release traffic batches with minimal stopping across the central corridor.',
      confidence: 89,
    },
  ];

  return (
    <>
      <PageHeader title="AI Decision Explainer" subtitle="Transparent reasoning for signal priority, route choice, predictions, and lane recommendations." />
      <Card className="mb-6">
        <div className="flex items-center gap-3">
          <BrainCircuit className="text-cyan-300" />
          <div>
            <h2 className="text-xl font-bold">TPI Breakdown</h2>
            <p className="text-sm text-slate-400 light:text-slate-600">Vehicle Count 40%, Wait Time 30%, Emergency Priority 20%, Predicted Incoming Traffic 10%.</p>
          </div>
        </div>
      </Card>
      <div className="grid gap-5 md:grid-cols-2">
        {explanations.map((item) => (
          <Card key={item.title}>
            <item.icon className="mb-4 text-cyan-300" size={28} />
            <h3 className="text-xl font-bold">{item.title}</h3>
            <p className="mt-3 text-sm leading-6 text-slate-300 light:text-slate-700">{item.text}</p>
            <div className="mt-5 flex items-center justify-between">
              <span className="text-sm text-slate-400 light:text-slate-600">AI confidence</span>
              <span className="font-bold text-cyan-300">{item.confidence}%</span>
            </div>
            <div className="mt-2 h-2 rounded-full bg-slate-800 light:bg-slate-200">
              <div className="h-2 rounded-full bg-cyan-300" style={{ width: `${item.confidence}%` }} />
            </div>
          </Card>
        ))}
      </div>
    </>
  );
}
