import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import AuthShell from './AuthShell.jsx';
import { Button, Input, Select } from '../components/ui.jsx';
import { roles } from '../data/mockData.js';
import { useAppStore } from '../store/useAppStore.js';

export default function SignIn() {
  const [show, setShow] = useState(false);
  const [form, setForm] = useState({ email: 'operator@city.ai', password: 'demo1234', role: 'Traffic Police' });
  const login = useAppStore((state) => state.login);
  const navigate = useNavigate();

  return (
    <AuthShell
      title="Welcome back"
      subtitle="Sign in to access the city traffic command dashboard."
      footer={<span>New here? <Link className="text-cyan-300" to="/signup">Create account</Link></span>}
    >
      <form
        className="space-y-4"
        onSubmit={(event) => {
          event.preventDefault();
          login(form);
          navigate('/app');
        }}
      >
        <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="Email" required />
        <div className="relative">
          <Input type={show ? 'text' : 'password'} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Password" required />
          <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-3 text-slate-400">
            {show ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>
        <Select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          {roles.map((role) => <option key={role}>{role}</option>)}
        </Select>
        <div className="flex justify-end">
          <Link to="/forgot-password" className="text-sm text-cyan-300">Forgot password?</Link>
        </div>
        <Button className="w-full" type="submit">Sign in</Button>
      </form>
    </AuthShell>
  );
}
