import { Bell, Lock, LogOut, UserCog } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button, Card, Input, PageHeader, Select } from '../components/ui.jsx';
import ThemeToggle from '../components/ThemeToggle.jsx';
import { roles } from '../data/mockData.js';
import { useAppStore } from '../store/useAppStore.js';

export default function Settings() {
  const user = useAppStore((state) => state.user);
  const logout = useAppStore((state) => state.logout);
  const navigate = useNavigate();
  return (
    <>
      <PageHeader title="Settings" subtitle="Profile, notifications, theme preference, role permissions, and session control." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <UserCog className="mb-4 text-cyan-300" />
          <h2 className="mb-4 text-xl font-bold">Profile Settings</h2>
          <div className="space-y-3">
            <Input defaultValue={user?.name} />
            <Input defaultValue={user?.email} />
            <Select defaultValue={user?.role}>
              {roles.map((role) => <option key={role}>{role}</option>)}
            </Select>
          </div>
        </Card>
        <Card>
          <Bell className="mb-4 text-cyan-300" />
          <h2 className="mb-4 text-xl font-bold">Notification Preferences</h2>
          {['Emergency corridor alerts', 'High TPI warnings', 'Citizen incident reports', 'System health warnings'].map((item) => (
            <label key={item} className="mb-3 flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-4 light:border-slate-200">
              <span>{item}</span>
              <input type="checkbox" defaultChecked className="h-5 w-5 accent-cyan-400" />
            </label>
          ))}
        </Card>
        <Card>
          <Lock className="mb-4 text-cyan-300" />
          <h2 className="mb-4 text-xl font-bold">Theme Preference</h2>
          <div className="flex items-center justify-between rounded-2xl bg-white/5 p-4 light:bg-slate-100">
            <span>Dark / Light mode</span>
            <ThemeToggle />
          </div>
        </Card>
        <Card>
          <LogOut className="mb-4 text-cyan-300" />
          <h2 className="mb-4 text-xl font-bold">Session</h2>
          <p className="mb-4 text-sm text-slate-400 light:text-slate-600">End the current mock-auth session and return to the landing page.</p>
          <Button variant="danger" onClick={() => { logout(); navigate('/'); }}>Logout</Button>
        </Card>
      </div>
    </>
  );
}
