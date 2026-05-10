import { Navigate, Route, Routes } from 'react-router-dom';
import { useAppStore } from './store/useAppStore.js';
import Landing from './pages/Landing.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import ForgotPassword from './pages/ForgotPassword.jsx';
import DashboardLayout from './layouts/DashboardLayout.jsx';
import Dashboard from './pages/Dashboard.jsx';
import LiveJunction from './pages/LiveJunction.jsx';
import Analytics from './pages/Analytics.jsx';
import Explainer from './pages/Explainer.jsx';
import EmergencyCorridor from './pages/EmergencyCorridor.jsx';
import ReportIncidents from './pages/ReportIncidents.jsx';
import SystemHealth from './pages/SystemHealth.jsx';
import Settings from './pages/Settings.jsx';

function ProtectedRoute({ children, roles }) {
  const user = useAppStore((state) => state.user);
  if (!user) return <Navigate to="/signin" replace />;
  if (roles && !roles.includes(user.role)) return <Navigate to="/app" replace />;
  return children;
}

export default function App() {
  const theme = useAppStore((state) => state.theme);

  return (
    <div className={theme}>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/app"
          element={
            <ProtectedRoute>
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<Dashboard />} />
          <Route path="junctions" element={<LiveJunction />} />
          <Route path="analytics" element={<Analytics />} />
          <Route path="explainer" element={<Explainer />} />
          <Route path="emergency" element={<EmergencyCorridor />} />
          <Route path="incidents" element={<ReportIncidents />} />
          <Route
            path="health"
            element={
              <ProtectedRoute roles={['Traffic Police', 'Admin']}>
                <SystemHealth />
              </ProtectedRoute>
            }
          />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </div>
  );
}
