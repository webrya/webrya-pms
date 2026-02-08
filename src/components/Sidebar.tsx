'use client';

import { useSession, signOut } from 'next-auth/react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { Building2, LayoutDashboard, ClipboardList, Home, Settings, LogOut, Calendar } from 'lucide-react';

export default function Sidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const isHost = session?.user?.role === 'HOST_PRIVATE' || session?.user?.role === 'PM_COMPANY';
  const isCleaner = session?.user?.role === 'CLEANER' || session?.user?.role === 'CLEANING_COMPANY';

  const navItems = [
    {
      id: 'dashboard',
      label: isCleaner ? 'My Tasks' : 'Dashboard',
      icon: isCleaner ? ClipboardList : LayoutDashboard,
      href: '/dashboard',
      show: true,
    },
    {
      id: 'properties',
      label: 'Properties',
      icon: Home,
      href: '/dashboard/properties',
      show: isHost,
    },
    {
      id: 'bookings',
      label: 'Bookings',
      icon: Calendar,
      href: '/dashboard/bookings',
      show: isHost,
    },
    {
      id: 'tasks',
      label: 'Tasks',
      icon: ClipboardList,
      href: '/dashboard/tasks',
      show: isHost,
    },
    {
      id: 'settings',
      label: 'Settings',
      icon: Settings,
      href: '/dashboard/settings',
      show: true,
    },
  ];

  return (
    <aside className="hidden md:flex flex-col w-72 bg-slate-900/50 border-r border-slate-800">
      <div className="p-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-500 to-brand-700 flex items-center justify-center shadow-lg shadow-brand-500/20">
            <Building2 className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-lg tracking-tight text-white">Webrya PMS</h1>
            <span className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">Property Management</span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          if (!item.show) return null;
          const isActive = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.id}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-xl border transition-all duration-200 group ${
                isActive
                  ? 'bg-brand-500/10 text-brand-400 border-brand-500/20 shadow-sm'
                  : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 border-transparent'
              }`}
            >
              <Icon className={`w-5 h-5 transition-colors ${isActive ? 'text-brand-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
              <span>{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-slate-800">
        <div className="glass-panel rounded-xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-10 h-10 rounded-full bg-brand-500 flex items-center justify-center text-white font-semibold">
              {session?.user?.name?.[0]?.toUpperCase() || 'U'}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">{session?.user?.name || 'User'}</p>
              <p className="text-xs text-slate-400 truncate">{session?.user?.role || 'HOST_PRIVATE'}</p>
            </div>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/auth/login' })}
            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-800/50 rounded-lg transition-colors"
          >
            <LogOut className="w-4 h-4" />
            Sign Out
          </button>
        </div>
      </div>
    </aside>
  );
}
