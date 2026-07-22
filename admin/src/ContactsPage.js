import React, { useState, useEffect } from 'react';
import Swal from 'sweetalert2';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export default function ContactsPage() {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_URL}/contacts`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setContacts(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Delete Inquiry?',
      text: 'This contact inquiry will be permanently deleted.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e74c3c',
      confirmButtonText: 'Yes, Delete',
    });
    if (result.isConfirmed) {
      try {
        await fetch(`${API_URL}/contacts/${id}`, { method: 'DELETE' });
        setContacts((prev) => prev.filter((c) => c.id !== id));
        Swal.fire({ icon: 'success', title: 'Deleted', text: 'Inquiry has been deleted.', timer: 1500, showConfirmButton: false });
      } catch (error) {
        Swal.fire('Error', 'Could not delete inquiry.', 'error');
      }
    }
  };

  return (
    <div className="space-y-4">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-neutral-500 mb-5">
        <span className="material-symbols-outlined text-[16px]">home</span>
        <span className="material-symbols-outlined text-[14px]">chevron_right</span>
        <span className="font-semibold text-neutral-800">Contact Inquiries</span>
      </div>

      {/* Table */}
      <div className="bg-white border border-neutral-200 rounded-lg shadow-sm overflow-x-auto">
        <table className="w-full text-sm text-left">
          <thead>
            <tr className="bg-neutral-50 border-b border-neutral-200 text-neutral-700">
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-16">S.No.</th>
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-48">Name</th>
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-40">Contact Info</th>
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm">Project Idea</th>
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-32">Date</th>
              <th className="py-3 px-4 font-bold text-neutral-800 text-sm w-20">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-100">
            {loading ? (
              <tr><td colSpan="6" className="py-12 text-center text-neutral-400">Loading...</td></tr>
            ) : contacts.length === 0 ? (
              <tr><td colSpan="6" className="py-12 text-center text-neutral-400">No contact inquiries found.</td></tr>
            ) : (
              contacts.map((contact, idx) => (
                <tr key={contact.id} className="hover:bg-neutral-50 transition-colors align-middle">
                  <td className="py-4 px-4 text-neutral-600 align-middle">{idx + 1}</td>
                  <td className="py-4 px-4 align-middle">
                    <div className="font-medium text-neutral-800">{contact.firstName} {contact.lastName}</div>
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <div className="text-neutral-600"><a href={`mailto:${contact.email}`} className="text-[#c8902a] hover:underline">{contact.email}</a></div>
                    <div className="text-neutral-600 mt-1">{contact.phone}</div>
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <div className="text-neutral-700 whitespace-pre-wrap">{contact.projectIdea}</div>
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <div className="text-neutral-500 text-xs">{new Date(contact.createdAt).toLocaleDateString()}</div>
                    <div className="text-neutral-400 text-xs">{new Date(contact.createdAt).toLocaleTimeString()}</div>
                  </td>
                  <td className="py-4 px-4 align-middle">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleDelete(contact.id)}
                        className="w-8 h-8 flex items-center justify-center rounded bg-red-500 hover:bg-red-600 text-white transition-colors"
                        title="Delete"
                      >
                        <span className="material-symbols-outlined text-[16px]">delete</span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
