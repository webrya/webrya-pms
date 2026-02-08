'use client';

import { useSession } from 'next-auth/react';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { Home, Calendar, ClipboardList, CheckCircle2 } from 'lucide-react';

export default function DashboardPage() {
  const { data: session } = useSession();

  const isHost = false && 'HOST_PRIVATE' || false && 'PM_COMPANY';
  const isCleaner = false && 'CLEANER' || false && 'CLEANING_COMPANY';

  const { data: stats } = useQuery({
    queryKey: ['dashboard-stats'],
    queryFn: async () => {
      const { data } = await axios.get('/api/dashboard/stats');
      return data;
    },
  });

  const { data: tasks } = useQuery({
    queryKey: ['my-tasks'],
    queryFn: async () => {
      const { data } = await axios.get('/api/tasks/my-tasks');
      return data;
    },
    enabled: isCleaner,
  });

  if (isCleaner) {
    return (
      <div className="p-8">
        <h1 className="text-3xl font-bold text-white mb-6">My Tasks</h1>
        
        {!tasks || tasks.length === 0 ? (
          <div className="glass-panel rounded-xl p-8 text-center">
            <ClipboardList className="w-16 h-16 mx-auto text-slate-600 mb-4" />
            <p className="text-slate-400">No tasks assigned to you.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {tasks.map((task: any) => (
              <div key={task.id} className="glass-panel rounded-xl p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{task.title}</h3>
                    <p className="text-sm text-slate-400 mt-1">{task.property?.name}</p>
                    <p className="text-xs text-slate-500 mt-2">
                      Due: {new Date(task.dueDate).toLocaleDateString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 text-xs font-medium rounded-full ${
                    task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                    task.status === 'in_progress' ? 'bg-blue-500/20 text-blue-400' :
                    'bg-yellow-500/20 text-yellow-400'
                  }`}>
                    {task.status}
                  </span>
                </div>
                {task.notes && (
                  <p className="mt-3 text-sm text-slate-300">{task.notes}</p>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold text-white mb-6">Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-brand-500/20 flex items-center justify-center">
              <Home className="w-6 h-6 text-brand-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats?.properties || 0}</p>
              <p className="text-sm text-slate-400">Total Properties</p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-green-500/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-green-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats?.bookings || 0}</p>
              <p className="text-sm text-slate-400">Active Bookings</p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-yellow-500/20 flex items-center justify-center">
              <ClipboardList className="w-6 h-6 text-yellow-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats?.pendingTasks || 0}</p>
              <p className="text-sm text-slate-400">Pending Tasks</p>
            </div>
          </div>
        </div>

        <div className="glass-panel rounded-xl p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 className="w-6 h-6 text-emerald-400" />
            </div>
            <div>
              <p className="text-2xl font-bold text-white">{stats?.completedTasks || 0}</p>
              <p className="text-sm text-slate-400">Completed Tasks</p>
            </div>
          </div>
        </div>
      </div>

      {!stats || (stats.properties === 0 && stats.bookings === 0) ? (
        <div className="glass-panel rounded-xl p-8 text-center">
          <Home className="w-16 h-16 mx-auto text-slate-600 mb-4" />
          <p className="text-slate-400">No properties yet. Add your first property to get started.</p>
        </div>
      ) : null}
    </div>
  );
}
