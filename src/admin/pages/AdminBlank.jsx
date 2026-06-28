import React from 'react';
import { Breadcrumb } from '../components/Breadcrumb';

export const AdminBlank = () => {
  return (
    <>
      <Breadcrumb pageName="Blank Page" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <p className="text-sm text-gray-500 dark:text-gray-400">This is a blank page. Start building your content here.</p>
      </div>
    </>
  );
};

export default AdminBlank;
