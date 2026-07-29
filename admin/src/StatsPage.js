import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const ICON_OPTIONS = [
  { id: 'FaAward', label: 'Award / Ribbon (Excellence)', icon: '🏆' },
  { id: 'FaMapMarkedAlt', label: 'Map Pin (Locations)', icon: '📍' },
  { id: 'FaUserFriends', label: 'People / Users (Units / Clients)', icon: '👥' },
  { id: 'FaShieldAlt', label: 'Shield (Clear Titles & Security)', icon: '🛡️' },
  { id: 'FaBullseye', label: 'Target / Goal', icon: '🎯' },
  { id: 'FaEye', label: 'Vision / Eye', icon: '👁️' },
  { id: 'FaCheckCircle', label: 'Check Circle (Approved)', icon: '✅' },
  { id: 'FaFileContract', label: 'Contract / Legal Document', icon: '📄' },
  { id: 'FaRoad', label: 'Road / Infrastructure', icon: '🛣️' },
  { id: 'FaHandHoldingUsd', label: 'Investment / Financing', icon: '💰' },
  { id: 'FaHome', label: 'Home / Villa Plots', icon: '🏡' },
  { id: 'FaChartLine', label: 'Growth / Appreciation', icon: '📈' },
];

function StatModal({ stat, onClose, onSave }) {
  const [form, setForm] = useState({
    count: stat?.count !== undefined ? stat.count : 0,
    suffix: stat?.suffix !== undefined ? stat.suffix : '+',
    title: stat?.title || '',
    icon: stat?.icon || 'FaAward',
    order: stat?.order !== undefined ? stat.order : 0,
    active: stat?.active !== undefined ? stat.active : true,
  });
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (form.count === undefined || form.count === null || form.count === '') {
      setError('Count value is required');
      return;
    }
    if (!form.title.trim()) {
      setError('Title / Description paragraph is required');
      return;
    }

    onSave({
      ...form,
      count: parseInt(form.count, 10) || 0,
      order: parseInt(form.order, 10) || 0,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 space-y-5 overflow-y-auto max-h-[90vh] border border-gray-100">
        <div className="text-center pt-2 border-b pb-4 border-gray-100">
          <h2 className="text-2xl font-bold text-gray-800">
            {stat ? 'Edit Stat Counter' : 'Add New Stat Counter'}
          </h2>
          <p className="text-sm text-gray-500 mt-1">Configure numbers, title text, suffix and icon</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm border border-red-200 flex items-center gap-2">
              <span className="material-symbols-outlined text-base">error</span>
              {error}
            </div>
          )}

          {/* Live Preview Box */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-center">
            <span className="text-xs uppercase font-semibold text-slate-400 tracking-wider block mb-2">Live Preview</span>
            <div className="flex items-center justify-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-slate-100 max-w-xs mx-auto">
              <div className="text-3xl text-sky-600">
                {ICON_OPTIONS.find(i => i.id === form.icon)?.icon || '🏆'}
              </div>
              <div className="text-left">
                <div className="text-2xl font-extrabold text-sky-600 leading-tight">
                  {form.count}{form.suffix}
                </div>
                <div className="text-xs text-gray-600 font-medium">
                  {form.title || 'Counter Title'}
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Count Number */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Count Number <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                min="0"
                value={form.count}
                onChange={(e) => setForm({ ...form, count: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                placeholder="e.g. 20"
                required
              />
            </div>

            {/* Suffix */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Suffix / Unit Symbol
              </label>
              <select
                value={form.suffix}
                onChange={(e) => setForm({ ...form, suffix: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
              >
                <option value="+">+ (Plus sign e.g. 20+)</option>
                <option value="%">% (Percent e.g. 88%)</option>
                <option value="k+">k+ (Thousands e.g. 10k+)</option>
                <option value="M+">M+ (Millions e.g. 1M+)</option>
                <option value="">None (Plain number e.g. 100)</option>
              </select>
            </div>
          </div>

          {/* Title / Paragraph */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Title / Label / Paragraph <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
              placeholder="e.g. Years of Excellence"
              required
            />
          </div>

          {/* Icon */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              Icon Type
            </label>
            <select
              value={form.icon}
              onChange={(e) => setForm({ ...form, icon: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
            >
              {ICON_OPTIONS.map((opt) => (
                <option key={opt.id} value={opt.id}>
                  {opt.icon} {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Display Order */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Display Order
              </label>
              <input
                type="number"
                value={form.order}
                onChange={(e) => setForm({ ...form, order: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-sky-500 outline-none transition"
                placeholder="0"
              />
            </div>

            {/* Active Status */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1">
                Status
              </label>
              <div className="mt-2 flex items-center">
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.active}
                    onChange={(e) => setForm({ ...form, active: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-sky-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-600"></div>
                  <span className="ml-3 text-sm font-medium text-gray-700">
                    {form.active ? 'Active' : 'Inactive'}
                  </span>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-sm font-medium text-white bg-sky-600 hover:bg-sky-700 rounded-lg shadow-sm transition"
            >
              {stat ? 'Update Stat' : 'Save Stat'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function StatsPage() {
  const [stats, setStats] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingStat, setEditingStat] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/stats`);
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else {
        console.error('Failed to fetch stats');
      }
    } catch (err) {
      console.error('Error fetching stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  const handleSaveStat = async (formData) => {
    try {
      const url = editingStat
        ? `${API_URL}/stats/${editingStat.id}`
        : `${API_URL}/stats`;
      const method = editingStat ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        Swal.fire({
          icon: 'success',
          title: editingStat ? 'Updated!' : 'Created!',
          text: `Stat counter has been ${editingStat ? 'updated' : 'added'} successfully.`,
          timer: 2000,
          showConfirmButton: false,
        });
        setShowModal(false);
        setEditingStat(null);
        fetchStats();
      } else {
        const errData = await res.json();
        Swal.fire('Error', errData.message || 'Action failed', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'Network or server error', 'error');
    }
  };

  const handleToggleActive = async (id) => {
    try {
      const res = await fetch(`${API_URL}/stats/${id}/toggle`, {
        method: 'PATCH',
      });
      if (res.ok) {
        fetchStats();
      } else {
        Swal.fire('Error', 'Failed to update status', 'error');
      }
    } catch (err) {
      Swal.fire('Error', 'Network or server error', 'error');
    }
  };

  const handleDeleteStat = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you really want to delete this stat counter?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Yes, delete it!',
    });

    if (result.isConfirmed) {
      try {
        const res = await fetch(`${API_URL}/stats/${id}`, {
          method: 'DELETE',
        });
        if (res.ok) {
          Swal.fire('Deleted!', 'Stat counter deleted successfully.', 'success');
          fetchStats();
        } else {
          Swal.fire('Error', 'Failed to delete stat counter.', 'error');
        }
      } catch (err) {
        Swal.fire('Error', 'Network or server error', 'error');
      }
    }
  };

  const handleAddNew = () => {
    if (stats.length >= 4) {
      Swal.fire({
        icon: 'warning',
        title: 'Limit Reached (Max 4)',
        text: 'Maximum limit of 4 stat counters reached. You cannot add more than 4 items. Please edit or delete an existing counter.',
        confirmButtonColor: '#0284c7',
      });
      return;
    }
    setEditingStat(null);
    setShowModal(true);
  };

  const filteredStats = stats.filter(s =>
    s.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    s.count?.toString().includes(searchTerm)
  );

  const activeCount = stats.filter(s => s.active).length;

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 bg-gradient-to-r from-sky-900 via-sky-800 to-indigo-900 text-white p-6 rounded-2xl shadow-xl">
        <div>
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-400 text-3xl">equalizer</span>
            <h1 className="text-2xl font-extrabold tracking-tight">Stat Counters & Achievements</h1>
            <span className="ml-2 bg-amber-500/20 text-amber-300 text-xs font-bold px-2.5 py-1 rounded-full border border-amber-400/30">
              Max 4 Items
            </span>
          </div>
          <p className="text-sky-200 text-sm mt-1">
            Manage counts, title text/paragraphs, units (+ / %), icons, and display order for stats (strictly capped at 4 items).
          </p>
        </div>
        <button
          onClick={handleAddNew}
          disabled={stats.length >= 4}
          className={`flex items-center justify-center gap-2 font-bold px-5 py-3 rounded-xl shadow-lg transition duration-200 ${
            stats.length >= 4
              ? 'bg-gray-400 text-gray-200 cursor-not-allowed opacity-80'
              : 'bg-amber-500 hover:bg-amber-400 text-slate-900 transform hover:-translate-y-0.5 active:translate-y-0'
          }`}
          title={stats.length >= 4 ? 'Maximum 4 counters reached' : 'Add New Counter'}
        >
          <span className="material-symbols-outlined font-bold">add</span>
          <span>{stats.length >= 4 ? 'Limit Reached (4/4)' : 'Add New Counter'}</span>
        </button>
      </div>

      {/* Limit Warning Banner if 4 items */}
      {stats.length >= 4 && (
        <div className="bg-amber-50 border border-amber-200 text-amber-900 px-4 py-3 rounded-xl flex items-center justify-between text-sm shadow-sm">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-amber-600">info</span>
            <span>
              <strong className="font-bold">Maximum Limit Reached:</strong> Exactly 4 stat counters are configured (4/4 slots used). Edit existing items or delete one to add a new counter.
            </span>
          </div>
          <span className="text-xs bg-amber-200 text-amber-900 px-2.5 py-1 rounded-full font-extrabold flex-shrink-0">
            4 / 4 Slots
          </span>
        </div>
      )}

      {/* Summary Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-sky-50 rounded-lg text-sky-600">
            <span className="material-symbols-outlined text-2xl">format_list_bulleted</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">{stats.length} / 4</div>
            <div className="text-xs text-gray-500">Counters Configured</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-emerald-50 rounded-lg text-emerald-600">
            <span className="material-symbols-outlined text-2xl">check_circle</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">{activeCount}</div>
            <div className="text-xs text-gray-500">Active Counters</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-xl shadow-sm border border-gray-100 flex items-center gap-4">
          <div className="p-3 bg-amber-50 rounded-lg text-amber-600">
            <span className="material-symbols-outlined text-2xl">visibility</span>
          </div>
          <div>
            <div className="text-2xl font-bold text-gray-800">
              {stats.length > 0 ? Math.max(...stats.map(s => s.count || 0)) : 0}+
            </div>
            <div className="text-xs text-gray-500">Highest Count Value</div>
          </div>
        </div>
      </div>

      {/* Control Bar */}
      <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100 flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <span className="material-symbols-outlined absolute left-3 top-2.5 text-gray-400">search</span>
          <input
            type="text"
            placeholder="Search by title or count..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg text-sm focus:outline-none focus:border-sky-500 transition"
          />
        </div>
        <div className="text-xs text-gray-500 font-medium">
          Showing {filteredStats.length} of {stats.length} stats
        </div>
      </div>

      {/* Stats List / Grid */}
      {loading ? (
        <div className="bg-white p-12 rounded-xl text-center shadow-sm border border-gray-100">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-sky-500 border-t-transparent"></div>
          <p className="mt-3 text-sm text-gray-500">Loading stat counters...</p>
        </div>
      ) : filteredStats.length === 0 ? (
        <div className="bg-white p-12 rounded-xl text-center shadow-sm border border-gray-100">
          <span className="material-symbols-outlined text-4xl text-gray-300">analytics</span>
          <h3 className="mt-2 text-base font-semibold text-gray-700">No stat counters found</h3>
          <p className="text-xs text-gray-400 mt-1">Add your first stat counter to display numbers & labels on the site.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
          {filteredStats.map((item) => {
            const iconObj = ICON_OPTIONS.find(i => i.id === item.icon);
            return (
              <div
                key={item.id}
                className={`bg-white rounded-xl shadow-sm border ${item.active ? 'border-gray-200 hover:border-sky-300' : 'border-gray-200 bg-gray-50/50 opacity-75'} transition-all duration-200 p-5 flex flex-col justify-between relative group`}
              >
                {/* Header info */}
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-50 text-sky-700 border border-sky-100">
                      Order #{item.order}
                    </span>
                    <button
                      onClick={() => handleToggleActive(item.id)}
                      className={`px-2.5 py-1 rounded-full text-xs font-bold transition ${
                        item.active
                          ? 'bg-emerald-100 text-emerald-800 hover:bg-emerald-200'
                          : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                      }`}
                    >
                      {item.active ? 'Active' : 'Inactive'}
                    </button>
                  </div>

                  {/* Main Display Box */}
                  <div className="my-4 text-center p-4 bg-slate-50 rounded-xl border border-slate-100">
                    <div className="text-3xl text-sky-600 mb-2">
                      {iconObj?.icon || '🏆'}
                    </div>
                    <div className="text-3xl font-extrabold text-sky-600 tracking-tight">
                      {item.count}{item.suffix || ''}
                    </div>
                    <div className="text-sm font-semibold text-gray-700 mt-1 line-clamp-2">
                      {item.title}
                    </div>
                  </div>
                </div>

                {/* Footer action buttons */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-2 mt-2">
                  <span className="text-xs text-gray-400 font-mono">ID: #{item.id}</span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => { setEditingStat(item); setShowModal(true); }}
                      className="p-1.5 text-sky-600 hover:bg-sky-50 rounded-lg transition"
                      title="Edit Stat Counter"
                    >
                      <span className="material-symbols-outlined text-lg">edit</span>
                    </button>
                    <button
                      onClick={() => handleDeleteStat(item.id)}
                      className="p-1.5 text-red-600 hover:bg-red-50 rounded-lg transition"
                      title="Delete Stat Counter"
                    >
                      <span className="material-symbols-outlined text-lg">delete</span>
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add / Edit Modal */}
      {showModal && (
        <StatModal
          stat={editingStat}
          onClose={() => { setShowModal(false); setEditingStat(null); }}
          onSave={handleSaveStat}
        />
      )}
    </div>
  );
}
