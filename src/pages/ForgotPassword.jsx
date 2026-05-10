import { Link } from 'react-router-dom';
import AuthShell from './AuthShell.jsx';
import { Button, Input } from '../components/ui.jsx';

export default function ForgotPassword() {
  return (
    <AuthShell title="Reset password" subtitle="Mock reset flow for demo authentication." footer={<Link className="text-cyan-300" to="/signin">Return to sign in</Link>}>
      <form className="space-y-4">
        <Input type="email" placeholder="Email address" required />
        <Button className="w-full" type="button">Send reset link</Button>
      </form>
    </AuthShell>
  );
}
