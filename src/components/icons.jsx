import React from 'react';

function IconBase({ size = 24, className = '', children, ...props }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      {...props}
    >
      {children}
    </svg>
  );
}

const make = (children) => (props) => <IconBase {...props}>{children}</IconBase>;

export const Activity = make(<><path d="M22 12h-4l-3 8-6-16-3 8H2" /></>);
export const AlertTriangle = make(<><path d="m12 3 10 18H2L12 3Z" /><path d="M12 9v4" /><path d="M12 17h.01" /></>);
export const Ambulance = make(<><path d="M10 17H6a3 3 0 0 1-3-3V7h11l3 4h4v6h-2" /><path d="M7 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" /><path d="M17 17a2 2 0 1 0 0 4 2 2 0 0 0 0-4Z" /><path d="M6 10h4" /><path d="M8 8v4" /></>);
export const ArrowUpRight = make(<><path d="M7 17 17 7" /><path d="M7 7h10v10" /></>);
export const BarChart3 = make(<><path d="M3 3v18h18" /><path d="M7 16v-5" /><path d="M12 16V7" /><path d="M17 16v-8" /></>);
export const Bell = make(<><path d="M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" /><path d="M10 21h4" /></>);
export const BrainCircuit = make(<><path d="M8 6a3 3 0 0 1 6 0" /><path d="M8 18a3 3 0 0 0 6 0" /><path d="M5 9h4" /><path d="M15 9h4" /><path d="M5 15h4" /><path d="M15 15h4" /><path d="M12 6v12" /></>);
export const Camera = make(<><path d="M14.5 4 16 7h4v13H4V7h4l1.5-3h5Z" /><circle cx="12" cy="13" r="3" /></>);
export const Car = make(<><path d="M5 12 7 6h10l2 6" /><path d="M3 12h18v6H3z" /><circle cx="7" cy="18" r="2" /><circle cx="17" cy="18" r="2" /></>);
export const CheckCircle2 = make(<><circle cx="12" cy="12" r="9" /><path d="m9 12 2 2 4-5" /></>);
export const CircleDot = make(<><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="2" /></>);
export const Clock = make(<><circle cx="12" cy="12" r="9" /><path d="M12 7v6l4 2" /></>);
export const Cloud = make(<><path d="M17.5 19H7a5 5 0 1 1 1.2-9.8A7 7 0 0 1 21 13.5 3.5 3.5 0 0 1 17.5 19Z" /></>);
export const Cpu = make(<><rect x="7" y="7" width="10" height="10" rx="2" /><path d="M4 9h3M4 15h3M17 9h3M17 15h3M9 4v3M15 4v3M9 17v3M15 17v3" /></>);
export const Database = make(<><ellipse cx="12" cy="5" rx="8" ry="3" /><path d="M4 5v14c0 1.7 3.6 3 8 3s8-1.3 8-3V5" /><path d="M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3" /></>);
export const Eye = make(<><path d="M2 12s4-7 10-7 10 7 10 7-4 7-10 7S2 12 2 12Z" /><circle cx="12" cy="12" r="3" /></>);
export const EyeOff = make(<><path d="m3 3 18 18" /><path d="M10.6 10.6A3 3 0 0 0 13.4 13.4" /><path d="M9.5 5.5A10.8 10.8 0 0 1 12 5c6 0 10 7 10 7a16 16 0 0 1-3 4.1" /><path d="M6.6 6.6C3.8 8.5 2 12 2 12s4 7 10 7c1.4 0 2.7-.4 3.8-1" /></>);
export const Gauge = make(<><path d="M21 12a9 9 0 1 0-18 0" /><path d="m12 12 4-4" /><path d="M7 15h10" /></>);
export const GitBranch = make(<><circle cx="6" cy="5" r="3" /><circle cx="18" cy="19" r="3" /><path d="M6 8v8a3 3 0 0 0 3 3h6" /><path d="M12 5h3a3 3 0 0 1 3 3v8" /></>);
export const HeartPulse = make(<><path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l1 1L12 21l7.8-7.6 1-1a5.5 5.5 0 0 0 0-7.8Z" /><path d="M3 13h4l2-4 4 8 2-4h6" /></>);
export const LayoutDashboard = make(<><rect x="3" y="3" width="7" height="8" rx="1" /><rect x="14" y="3" width="7" height="5" rx="1" /><rect x="14" y="12" width="7" height="9" rx="1" /><rect x="3" y="15" width="7" height="6" rx="1" /></>);
export const Lock = make(<><rect x="4" y="11" width="16" height="10" rx="2" /><path d="M8 11V7a4 4 0 0 1 8 0v4" /></>);
export const LogOut = make(<><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></>);
export const MapPinned = make(<><path d="M18 8c0 4-6 11-6 11S6 12 6 8a6 6 0 1 1 12 0Z" /><circle cx="12" cy="8" r="2" /><path d="M4 20h16" /></>);
export const Menu = make(<><path d="M4 6h16M4 12h16M4 18h16" /></>);
export const Moon = make(<><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8Z" /></>);
export const Radio = make(<><path d="M4.9 19.1a10 10 0 0 1 0-14.2" /><path d="M7.8 16.2a6 6 0 0 1 0-8.4" /><circle cx="12" cy="12" r="2" /><path d="M16.2 7.8a6 6 0 0 1 0 8.4" /><path d="M19.1 4.9a10 10 0 0 1 0 14.2" /></>);
export const RadioTower = Radio;
export const Route = make(<><circle cx="6" cy="19" r="3" /><circle cx="18" cy="5" r="3" /><path d="M8.5 17 15.5 7" /></>);
export const Server = make(<><rect x="4" y="4" width="16" height="6" rx="2" /><rect x="4" y="14" width="16" height="6" rx="2" /><path d="M8 7h.01M8 17h.01" /></>);
export const Settings = make(<><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.8 2.8-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6V21h-4v-.1a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1-2.8-2.8.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H3v-4h.1a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9l-.1-.1 2.8-2.8.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V3h4v.1a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 2.8 2.8-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.1v4h-.1a1.7 1.7 0 0 0-1.6 1Z" /></>);
export const ShieldAlert = make(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="M12 8v4" /><path d="M12 16h.01" /></>);
export const ShieldCheck = make(<><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10Z" /><path d="m9 12 2 2 4-5" /></>);
export const Siren = make(<><path d="M7 18v-6a5 5 0 0 1 10 0v6" /><path d="M5 18h14" /><path d="M3 22h18" /><path d="M12 2v2M4 5l2 2M20 5l-2 2" /></>);
export const Sun = make(<><circle cx="12" cy="12" r="4" /><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" /></>);
export const Timer = make(<><circle cx="12" cy="13" r="8" /><path d="M12 9v4l3 2" /><path d="M9 2h6" /></>);
export const TrafficCone = make(<><path d="m9 3-4 18h14L15 3H9Z" /><path d="M7 13h10M8 8h8M4 21h16" /></>);
export const UserCircle = make(<><circle cx="12" cy="12" r="10" /><circle cx="12" cy="10" r="3" /><path d="M7 20a5 5 0 0 1 10 0" /></>);
export const UserCog = make(<><circle cx="9" cy="8" r="4" /><path d="M2 21a7 7 0 0 1 12-5" /><circle cx="18" cy="18" r="3" /><path d="M18 13v2M18 21v2M13 18h2M21 18h2" /></>);
export const Video = make(<><path d="M3 7h12v10H3z" /><path d="m15 11 6-4v10l-6-4" /></>);
