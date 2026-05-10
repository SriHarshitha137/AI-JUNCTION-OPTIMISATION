import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import AuthShell from './AuthShell.jsx';
import { Button, Input, Select } from '../components/ui.jsx';
import { roles } from '../data/mockData.js';
import { useAppStore } from '../store/useAppStore.js';

export default function SignUp() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'Public User' });
  const login = useAppStore((state) => state.login);
  const navigate = useNavigate();
  return (
    <AuthShell title="Create account" subtitle="Choose a role and enter the simulation workspace." footer={<span>Already registered? <Link className="text-cyan-300" to="/signin">Sign in</Link></span>}>
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); login(form); navigate('/app'); }}>
        <Input placeholder="Full name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
        <Input type="email" placeholder="Email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
        <Input type="password" placeholder="Password" minLength={6} value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} required />
        <Select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
          {roles.map((role) => <option key={role}>{role}</option>)}
        </Select>
        <Button className="w-full" type="submit">Create account</Button>
      </form>
    </AuthShell>
  );
}
