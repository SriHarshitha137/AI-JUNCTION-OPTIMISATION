export function vehicleTotal(vehicles) {
  return Object.entries(vehicles)
    .filter(([key]) => key !== 'ambulances')
    .reduce((sum, [, value]) => sum + value, 0);
}

export function calculateTpi(junction) {
  const count = vehicleTotal(junction.vehicles);
  const normalizedCount = Math.min(100, count / 5);
  const wait = Math.min(100, junction.wait * 10);
  const emergency = junction.emergency || junction.vehicles.ambulances * 100;
  const predicted = junction.predicted;
  return Math.round(normalizedCount * 0.4 + wait * 0.3 + emergency * 0.2 + predicted * 0.1);
}

export function signalFromTpi(tpi) {
  if (tpi >= 75) return 'Green';
  if (tpi >= 55) return 'Amber';
  return 'Red';
}

export function statusColor(value) {
  if (value === 'Healthy' || value === 'Green' || value === 'Low') return 'text-emerald-300 bg-emerald-400/10 border-emerald-400/30';
  if (value === 'Warning' || value === 'Amber' || value === 'Medium') return 'text-amber-300 bg-amber-400/10 border-amber-400/30';
  return 'text-rose-300 bg-rose-400/10 border-rose-400/30';
}
