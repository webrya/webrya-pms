'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { User, Lock, Globe } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export default function SettingsPage() {
  const { data: session, update } = useSession();
  const { t, language, setLanguage } = useLanguage();
  const [activeTab, setActiveTab] = useState('profile');

  const updateProfileMutation = useMutation({
    mutationFn: async (data: any) => {
      return axios.put('/api/settings/profile', data);
    },
    onSuccess: () => {
      alert(t('success'));
      update();
    },
  });

  const updatePasswordMutation = useMutation({
    mutationFn: async (data: any) => {
      return axios.put('/api/settings/password', data);
    },
    onSuccess: () => {
      alert(t('success'));
    },
  });

  const tabs = [
    { id: 'profile', label: t('profile'), icon: User },
    { id: 'security', label: t('security'), icon: Lock },
    { id: 'preferences', label: t('preferences'), icon: Globe },
  ];

  return (
    <div className=\"p-8\">
      <h1 className=\"text-3xl font-bold text-white mb-6\">{t('settings')}</h1>

      <div className=\"flex gap-6\">
        <div className=\"w-64 glass-panel rounded-xl p-4\">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
                  activeTab === tab.id
                    ? 'bg-brand-500/10 text-brand-400'
                    : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/50'
                }`}
              >
                <Icon className=\"w-5 h-5\" />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div className=\"flex-1 glass-panel rounded-xl p-8\">
          {activeTab === 'profile' && <ProfileTab session={session} onSubmit={updateProfileMutation.mutate} />}
          {activeTab === 'security' && <SecurityTab onSubmit={updatePasswordMutation.mutate} />}
          {activeTab === 'preferences' && <PreferencesTab language={language} setLanguage={setLanguage} />}
        </div>
      </div>
    </div>
  );
}

function ProfileTab({ session, onSubmit }: any) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
  });

  return (
    <div>
      <h2 className=\"text-2xl font-bold text-white mb-6\">{t('profile')}</h2>
      <form onSubmit={(e) => { e.preventDefault(); onSubmit(formData); }} className=\"space-y-4\">
        <div>
          <label className=\"block text-sm font-medium text-slate-300 mb-2\">
            {t('fullName')}
          </label>
          <input
            type=\"text\"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className=\"w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-brand-500\"
          />
        </div>

        <div>
          <label className=\"block text-sm font-medium text-slate-300 mb-2\">
            {t('email')}
          </label>
          <input
            type=\"email\"
            value={session?.user?.email}
            disabled
            className=\"w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-500 cursor-not-allowed\"
          />
        </div>

        <div>
          <label className=\"block text-sm font-medium text-slate-300 mb-2\">
            {t('role')}
          </label>
          <input
            type=\"text\"
            value={t(session?.user?.role)}
            disabled
            className=\"w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-slate-500 cursor-not-allowed\"
          />
        </div>

        <button
          type=\"submit\"
          className=\"px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors\"
        >
          {t('save')}
        </button>
      </form>
    </div>
  );
}

function SecurityTab({ onSubmit }: any) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    onSubmit(formData);
    setFormData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div>
      <h2 className=\"text-2xl font-bold text-white mb-6\">{t('security')}</h2>
      <form onSubmit={handleSubmit} className=\"space-y-4\">
        <div>
          <label className=\"block text-sm font-medium text-slate-300 mb-2\">
            {t('currentPassword')}
          </label>
          <input
            type=\"password\"
            value={formData.currentPassword}
            onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
            required
            className=\"w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-brand-500\"
          />
        </div>

        <div>
          <label className=\"block text-sm font-medium text-slate-300 mb-2\">
            {t('newPassword')}
          </label>
          <input
            type=\"password\"
            value={formData.newPassword}
            onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
            required
            minLength={6}
            className=\"w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-brand-500\"
          />
        </div>

        <div>
          <label className=\"block text-sm font-medium text-slate-300 mb-2\">
            {t('confirmPassword')}
          </label>
          <input
            type=\"password\"
            value={formData.confirmPassword}
            onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
            required
            minLength={6}
            className=\"w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white focus:outline-none focus:border-brand-500\"
          />
        </div>

        <button
          type=\"submit\"
          className=\"px-6 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors\"
        >
          {t('changePassword')}
        </button>
      </form>
    </div>
  );
}

function PreferencesTab({ language, setLanguage }: any) {
  const { t } = useLanguage();

  return (
    <div>
      <h2 className=\"text-2xl font-bold text-white mb-6\">{t('preferences')}</h2>
      <div>
        <label className=\"block text-sm font-medium text-slate-300 mb-3\">
          {t('language')}
        </label>
        <div className=\"space-y-2\">
          <button
            onClick={() => setLanguage('en')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              language === 'en'
                ? 'bg-brand-500/10 border-2 border-brand-500 text-brand-400'
                : 'bg-slate-900/50 border-2 border-slate-700 text-slate-300 hover:border-slate-600'
            }`}
          >
            <Globe className=\"w-5 h-5\" />
            <div className=\"text-left\">
              <p className=\"font-medium\">English</p>
              <p className=\"text-xs text-slate-500\">Default language</p>
            </div>
          </button>

          <button
            onClick={() => setLanguage('el')}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
              language === 'el'
                ? 'bg-brand-500/10 border-2 border-brand-500 text-brand-400'
                : 'bg-slate-900/50 border-2 border-slate-700 text-slate-300 hover:border-slate-600'
            }`}
          >
            <Globe className=\"w-5 h-5\" />
            <div className=\"text-left\">
              <p className=\"font-medium\">Ελληνικά (Greek)</p>
              <p className=\"text-xs text-slate-500\">Secondary language</p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
