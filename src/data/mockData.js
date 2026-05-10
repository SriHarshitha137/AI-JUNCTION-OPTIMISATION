export const roles = ['Public User', 'Traffic Police', 'Admin', 'Emergency Services'];

export const junctions = [
  {
    id: 1,
    name: 'Central Metro Junction',
    area: 'MG Road',
    coords: [12.9756, 77.6068],
    vehicles: { cars: 148, bikes: 214, buses: 18, trucks: 26, ambulances: 0 },
    wait: 6.8,
    congestion: 78,
    predicted: 72,
    emergency: 0,
    signal: 'Green',
    timer: 42,
    lanes: ['North corridor', 'East service lane', 'South arterial', 'West market road'],
  },
  {
    id: 2,
    name: 'Hospital Link Signal',
    area: 'Victoria Road',
    coords: [12.9704, 77.5946],
    vehicles: { cars: 91, bikes: 132, buses: 9, trucks: 10, ambulances: 1 },
    wait: 4.2,
    congestion: 52,
    predicted: 49,
    emergency: 100,
    signal: 'Green',
    timer: 68,
    lanes: ['ICU access road', 'Flyover merge', 'Market lane', 'Civic loop'],
  },
  {
    id: 3,
    name: 'Tech Park Square',
    area: 'Electronic City',
    coords: [12.9669, 77.6158],
    vehicles: { cars: 176, bikes: 189, buses: 24, trucks: 32, ambulances: 0 },
    wait: 8.4,
    congestion: 86,
    predicted: 91,
    emergency: 0,
    signal: 'Red',
    timer: 21,
    lanes: ['Campus entry', 'Outer ring merge', 'Bus priority lane', 'Service road'],
  },
  {
    id: 4,
    name: 'Railway Gate Junction',
    area: 'Majestic',
    coords: [12.9832, 77.5921],
    vehicles: { cars: 124, bikes: 155, buses: 31, trucks: 20, ambulances: 0 },
    wait: 7.5,
    congestion: 69,
    predicted: 76,
    emergency: 0,
    signal: 'Amber',
    timer: 12,
    lanes: ['Station exit', 'Bus terminal arm', 'Goods lane', 'Main approach'],
  },
  {
    id: 5,
    name: 'Airport Express Node',
    area: 'Hebbal',
    coords: [12.9888, 77.6102],
    vehicles: { cars: 113, bikes: 98, buses: 12, trucks: 38, ambulances: 0 },
    wait: 5.1,
    congestion: 58,
    predicted: 63,
    emergency: 0,
    signal: 'Green',
    timer: 35,
    lanes: ['Airport ramp', 'Lake road', 'Freight bay', 'City return'],
  },
];

export const incidents = [
  { id: 1, type: 'Accident', severity: 'High', location: 'Tech Park Square', status: 'Dispatched', time: '08:42 AM' },
  { id: 2, type: 'Road work', severity: 'Medium', location: 'Railway Gate Junction', status: 'Monitoring', time: '09:15 AM' },
  { id: 3, type: 'Stalled bus', severity: 'Low', location: 'Central Metro Junction', status: 'Cleared', time: '10:05 AM' },
];

export const hourlyCongestion = [
  { time: '6 AM', congestion: 32, predicted: 35, wait: 2.2 },
  { time: '8 AM', congestion: 74, predicted: 79, wait: 6.1 },
  { time: '10 AM', congestion: 61, predicted: 58, wait: 4.8 },
  { time: '12 PM', congestion: 48, predicted: 52, wait: 3.5 },
  { time: '2 PM', congestion: 56, predicted: 62, wait: 4.1 },
  { time: '4 PM', congestion: 72, predicted: 78, wait: 6.5 },
  { time: '6 PM', congestion: 89, predicted: 92, wait: 8.8 },
  { time: '8 PM', congestion: 66, predicted: 59, wait: 5.4 },
];

export const vehicleDistribution = [
  { name: 'Cars', value: 652 },
  { name: 'Bikes', value: 788 },
  { name: 'Buses', value: 94 },
  { name: 'Trucks', value: 126 },
  { name: 'Ambulances', value: 3 },
];

export const healthMetrics = [
  { label: 'Camera Connectivity', value: '96%', status: 'Healthy' },
  { label: 'AI Model Accuracy', value: '94.8%', status: 'Healthy' },
  { label: 'Sensor Health', value: '88%', status: 'Warning' },
  { label: 'API Uptime', value: '99.98%', status: 'Healthy' },
  { label: 'Server CPU Usage', value: '72%', status: 'Warning' },
  { label: 'Database Status', value: 'Stable', status: 'Healthy' },
];

export const routes = [
  { name: 'Route A - Metro Spine', time: 26, congestion: 58, tpi: 61, note: 'Balanced flow with two mild-pressure signals.' },
  { name: 'Route B - Hospital Link', time: 19, congestion: 34, tpi: 42, note: 'Fastest route, avoids Tech Park Square and active incident zone.' },
  { name: 'Route C - Outer Ring', time: 31, congestion: 73, tpi: 79, note: 'Longer route with freight traffic and high predicted inflow.' },
];
