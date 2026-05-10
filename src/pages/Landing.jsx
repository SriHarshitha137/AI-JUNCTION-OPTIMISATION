import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Ambulance, BarChart3, BrainCircuit, MapPinned, RadioTower, ShieldCheck, TrafficCone } from 'lucide-react';
import { Button, Card } from '../components/ui.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';

const features = [
  { icon: RadioTower, title: 'Vehicle detection', text: 'Mock camera intelligence estimates flow, wait time, and emergency presence.' },
  { icon: BrainCircuit, title: 'TPI signal logic', text: 'Signals are prioritized by traffic pressure instead of simple fixed timers.' },
  { icon: Ambulance, title: 'Emergency corridor', text: 'Upcoming junctions turn green and restore normal timing after passage.' },
  { icon: BarChart3, title: 'Prediction dashboard', text: 'Forecast congestion, response time, and carbon savings with rich charts.' },
];

export default function Landing() {
  return (
    <div className="min-h-screen bg-slate-950 text-white light:bg-slate-50 light:text-slate-950">
      <section className="relative min-h-screen overflow-hidden road-lines">
        <div className="absolute inset-0 traffic-grid opacity-70" />
        <div className="absolute bottom-10 left-0 right-0 h-24 overflow-hidden opacity-70">
          {[0, 1, 2, 3].map((i) => (
            <div key={i} className="flow-line mb-4 h-2 rounded-full bg-gradient-to-r from-transparent via-cyan-300 to-transparent" style={{ animationDelay: `${i * 0.8}s` }} />
          ))}
        </div>
        <nav className="relative z-10 flex items-center justify-between px-6 py-5 md:px-12">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-cyan-400 p-2 text-slate-950">
              <TrafficCone size={26} />
            </div>
            <span className="font-bold">AI Junction</span>
          </div>
          <div className="flex items-center gap-3">
            <ThemeToggle />
            <Link to="/signin"><Button variant="ghost">Sign in</Button></Link>
          </div>
        </nav>

        <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-center px-6 pb-24 pt-20 md:min-h-[76vh] md:px-12">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="max-w-4xl">
            <div className="mb-5 inline-flex rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-200">
              Government-grade AI traffic command platform
            </div>
            <h1 className="text-5xl font-black leading-tight md:text-7xl">AI Based Junction Optimization System</h1>
            <p className="mt-6 max-w-2xl text-lg text-slate-300">
              Real-time AI-driven traffic signal optimization and emergency corridor management for smarter city junctions.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/signup"><Button>Get Started</Button></Link>
              <Link to="/signin"><Button variant="ghost">Live Demo</Button></Link>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid gap-5 md:grid-cols-4">
          {features.map((feature) => (
            <Card key={feature.title}>
              <feature.icon className="mb-4 text-cyan-300" />
              <h3 className="text-lg font-semibold text-white light:text-slate-950">{feature.title}</h3>
              <p className="mt-2 text-sm text-slate-400 light:text-slate-600">{feature.text}</p>
            </Card>
          ))}
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {['Scan live pressure', 'Score roads with TPI', 'Open safest green corridor'].map((step, index) => (
            <Card key={step}>
              <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400 text-slate-950">{index + 1}</div>
              <h3 className="text-xl font-bold">{step}</h3>
              <p className="mt-2 text-sm text-slate-400 light:text-slate-600">
                The platform combines camera counts, wait time, emergency priority, and prediction to recommend a practical traffic action.
              </p>
            </Card>
          ))}
        </div>
      </section>

      <footer className="border-t border-white/10 px-6 py-8 text-center text-sm text-slate-400 light:border-slate-200">
        <MapPinned className="mx-auto mb-2 text-cyan-300" /> AI Junction Optimization System
      </footer>
    </div>
  );
}
