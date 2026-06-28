import React from 'react';
import { MetricGroup } from '../components/MetricGroup';
import { ChartOne } from '../components/ChartOne';
import { ChartTwo } from '../components/ChartTwo';
import { ChartThree } from '../components/ChartThree';
import { TableOne } from '../components/TableOne';

export const AdminDashboard = () => {
  return (
    <div className="grid grid-cols-12 gap-4 md:gap-6">
      <div className="col-span-12 space-y-6 xl:col-span-7">
        <MetricGroup />
        <ChartOne />
      </div>
      <div className="col-span-12 xl:col-span-5">
        <ChartTwo />
      </div>
      <div className="col-span-12">
        <ChartThree />
      </div>
      <div className="col-span-12">
        <TableOne />
      </div>
    </div>
  );
};

export default AdminDashboard;
