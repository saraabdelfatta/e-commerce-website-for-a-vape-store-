import React, { useState } from 'react';
import Breadcrumb from '../components/Breadcrumb';

export const AdminProfile = () => {
  const [isInfoModalOpen, setIsInfoModalOpen] = useState(false);
  const adminEmail = sessionStorage.getItem('adminUserEmail') || 'admin@vapestore.com';

  return (
    <>
      <Breadcrumb pageName="Profile" />

      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">Profile</h3>

        {/* Profile Header */}
        <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
          <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
            <div className="flex flex-col items-center w-full gap-6 xl:flex-row">
              <div className="w-20 h-20 overflow-hidden border border-gray-200 rounded-full dark:border-gray-800">
                <img src="/admin-assets/images/user-placeholder.svg" alt="user" />
              </div>
              <div className="order-3 xl:order-2">
                <h4 className="mb-2 text-lg font-semibold text-center text-gray-800 dark:text-white/90 xl:text-left">
                  Admin User
                </h4>
                <div className="flex flex-col items-center gap-1 text-center xl:flex-row xl:gap-3 xl:text-left">
                  <p className="text-sm text-gray-500 dark:text-gray-400">Store Manager</p>
                  <div className="hidden h-3.5 w-px bg-gray-300 dark:bg-gray-700 xl:block"></div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Vape Store</p>
                </div>
              </div>
            </div>
            <button
              id="admin-profile-edit-btn"
              onClick={() => setIsInfoModalOpen(true)}
              className="flex w-full items-center justify-center gap-2 rounded-full border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
            >
              <svg className="fill-current" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M15.0911 2.78206C14.2125 1.90338 12.7878 1.90338 11.9092 2.78206L4.57524 10.116C4.26682 10.4244 4.0547 10.8158 3.96468 11.2426L3.31231 14.3352C3.25997 14.5833 3.33653 14.841 3.51583 15.0203C3.69512 15.1996 3.95286 15.2761 4.20096 15.2238L7.29355 14.5714C7.72031 14.4814 8.11172 14.2693 8.42013 13.9609L15.7541 6.62695C16.6327 5.74827 16.6327 4.32365 15.7541 3.44497L15.0911 2.78206Z" fill="" />
              </svg>
              Edit
            </button>
          </div>
        </div>

        {/* Personal Information */}
        <div className="p-5 mb-6 border border-gray-200 rounded-2xl dark:border-gray-800 lg:p-6">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="w-full">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-6">Personal Information</h4>
              <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-7 2xl:gap-x-32">
                {[
                  { label: 'First Name', value: 'Admin' },
                  { label: 'Last Name', value: 'User' },
                  { label: 'Email address', value: adminEmail },
                  { label: 'Phone', value: '+1 555 000 0000' },
                  { label: 'Role', value: 'Vape Store Administrator' },
                ].map(({ label, value }) => (
                  <div key={label}>
                    <p className="mb-2 text-xs leading-normal text-gray-500 dark:text-gray-400">{label}</p>
                    <p className="text-sm font-medium text-gray-800 dark:text-white/90">{value}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      {isInfoModalOpen && (
        <div className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/50 px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 dark:bg-gray-900 shadow-xl">
            <div className="flex items-center justify-between mb-5">
              <h4 className="text-lg font-semibold text-gray-800 dark:text-white/90">Edit Profile Information</h4>
              <button onClick={() => setIsInfoModalOpen(false)} className="text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-white">
                <svg className="fill-current" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" clipRule="evenodd" d="M6.21967 7.28131C5.92678 6.98841 5.92678 6.51354 6.21967 6.22065C6.51256 5.92775 6.98744 5.92775 7.28033 6.22065L11.999 10.9393L16.7176 6.22078C17.0105 5.92789 17.4854 5.92788 17.7782 6.22078C18.0711 6.51367 18.0711 6.98855 17.7782 7.28144L13.0597 12L17.7782 16.7186C18.0711 17.0115 18.0711 17.4863 17.7782 17.7792C17.4854 18.0721 17.0105 18.0721 16.7176 17.7792L11.999 13.0607L7.28033 17.7794C6.98744 18.0722 6.51256 18.0722 6.21967 17.7794C5.92678 17.4865 5.92678 17.0116 6.21967 16.7187L10.9384 12L6.21967 7.28131Z" fill="" />
                </svg>
              </button>
            </div>
            <div className="space-y-4">
              {[
                { label: 'First Name', id: 'profile-first-name', defaultValue: 'Admin' },
                { label: 'Last Name', id: 'profile-last-name', defaultValue: 'User' },
                { label: 'Email', id: 'profile-email', defaultValue: adminEmail },
                { label: 'Phone', id: 'profile-phone', defaultValue: '+1 555 000 0000' },
              ].map(({ label, id, defaultValue }) => (
                <div key={id}>
                  <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-400">{label}</label>
                  <input
                    type="text"
                    id={id}
                    defaultValue={defaultValue}
                    className="h-11 w-full rounded-lg border border-gray-300 bg-transparent px-4 py-2.5 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                  />
                </div>
              ))}
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setIsInfoModalOpen(false)} className="flex-1 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400">Cancel</button>
              <button onClick={() => setIsInfoModalOpen(false)} className="flex-1 rounded-lg bg-brand-500 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-600">Save Changes</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminProfile;
