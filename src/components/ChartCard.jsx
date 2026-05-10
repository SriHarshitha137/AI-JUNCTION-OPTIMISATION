import { Card } from './ui.jsx';

export default function ChartCard({ title, children }) {
  return (
    <Card className="min-h-[320px]">
      <h3 className="mb-4 text-lg font-semibold text-white light:text-slate-950">{title}</h3>
      {children}
    </Card>
  );
}
