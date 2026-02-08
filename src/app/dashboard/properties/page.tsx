'use client';

import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Plus, Home, Edit, Trash2, RefreshCw, Image as ImageIcon } from 'lucide-react';
import { useLanguage } from '@/components/LanguageProvider';

export default function PropertiesPage() {
  const { t } = useLanguage();
  const queryClient = useQueryClient();
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProperty, setEditingProperty] = useState<any>(null);
  const [syncing, setSyncing] = useState<string | null>(null);

  const { data: propertiesData, isLoading } = useQuery({
    queryKey: ['properties'],
    queryFn: async () => {
      const { data } = await axios.get('/api/properties');
      return data;
    },
  });

  const createMutation = useMutation({
    mutationFn: async (data: any) => {
      return axios.post('/api/properties', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      setShowAddModal(false);
    },
  });

  const updateMutation = useMutation({
    mutationFn: async ({ id, ...data }: any) => {
      return axios.put(`/api/properties/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
      setEditingProperty(null);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      return axios.delete(`/api/properties/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    },
  });

  const syncBookings = async (propertyId: string) => {
    try {
      setSyncing(propertyId);
      const { data } = await axios.post(`/api/properties/${propertyId}/sync`);
      alert(`Sync complete! ${data.newBookings} new bookings, ${data.newTasks} new tasks created.`);
      queryClient.invalidateQueries({ queryKey: ['properties'] });
    } catch (error) {
      alert('Sync failed. Please check the iCal URL and try again.');
    } finally {
      setSyncing(null);
    }
  };

  if (isLoading) {
    return (
      <div className="p-8 text-white">
        <p>{t('loading')}</p>
      </div>
    );
  }

  const properties = propertiesData?.properties || [];

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-white">{t('properties')}</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors"
        >
          <Plus className="w-5 h-5" />
          {t('addProperty')}
        </button>
      </div>

      {properties.length === 0 ? (
        <div className="glass-panel rounded-xl p-8 text-center">
          <Home className="w-16 h-16 mx-auto text-slate-600 mb-4" />
          <p className="text-slate-400">{t('noProperties')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.map((property: any) => (
            <div key={property.id} className="glass-panel rounded-xl p-6">
              {property.imageUrl ? (
                <img src={property.imageUrl} alt={property.name} className="w-full h-48 object-cover rounded-lg mb-4" />
              ) : (
                <div className="w-full h-48 bg-slate-800 rounded-lg mb-4 flex items-center justify-center">
                  <ImageIcon className="w-12 h-12 text-slate-600" />
                </div>
              )}
              
              <h3 className="text-lg font-semibold text-white mb-2">{property.name}</h3>
              {property.address && (
                <p className="text-sm text-slate-400 mb-3">{property.address}</p>
              )}

              <div className="flex gap-2 text-xs text-slate-500 mb-4">
                <span>{property._count?.bookings || 0} bookings</span>
                <span>•</span>
                <span>{property._count?.tasks || 0} tasks</span>
              </div>

              <div className="flex gap-2">
                <button
                  onClick={() => setEditingProperty(property)}
                  className="flex-1 flex items-center justify-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white text-sm rounded-lg transition-colors"
                >
                  <Edit className="w-4 h-4" />
                  {t('edit')}
                </button>
                {property.icalUrl && (
                  <button
                    onClick={() => syncBookings(property.id)}
                    disabled={syncing === property.id}
                    className="flex items-center justify-center gap-2 px-3 py-2 bg-brand-500 hover:bg-brand-600 disabled:bg-slate-700 text-white text-sm rounded-lg transition-colors"
                  >
                    <RefreshCw className={`w-4 h-4 ${syncing === property.id ? 'animate-spin' : ''}`} />
                  </button>
                )}
                <button
                  onClick={() => {
                    if (confirm(t('confirmDelete'))) {
                      deleteMutation.mutate(property.id);
                    }
                  }}
                  className="flex items-center justify-center gap-2 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 text-sm rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {(showAddModal || editingProperty) && (
        <PropertyModal
          property={editingProperty}
          onClose={() => {
            setShowAddModal(false);
            setEditingProperty(null);
          }}
          onSubmit={(data) => {
            if (editingProperty) {
              updateMutation.mutate({ id: editingProperty.id, ...data });
            } else {
              createMutation.mutate(data);
            }
          }}
        />
      )}
    </div>
  );
}

function PropertyModal({ property, onClose, onSubmit }: any) {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    name: property?.name || '',
    description: property?.description || '',
    address: property?.address || '',
    icalUrl: property?.icalUrl || '',
    imageUrl: property?.imageUrl || '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50">
      <div className="glass rounded-2xl p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold text-white mb-6">
          {property ? t('editProperty') : t('addProperty')}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t('propertyName')}
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t('description')}
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t('address')}
            </label>
            <input
              type="text"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t('icalUrl')}
            </label>
            <input
              type="url"
              value={formData.icalUrl}
              onChange={(e) => setFormData({ ...formData, icalUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-2">
              {t('uploadImage')} (URL)
            </label>
            <input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://..."
              className="w-full px-4 py-3 bg-slate-900/50 border border-slate-700 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:border-brand-500"
            />
          </div>

          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors"
            >
              {t('cancel')}
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors"
            >
              {t('save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
