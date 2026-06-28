import React from 'react';
import ReactApexChart from 'react-apexcharts';

const chartOptions = {
  series: [
    { name: 'Sales', data: [180, 190, 170, 160, 175, 165, 170, 205, 230, 210, 240, 235] },
    { name: 'Revenue', data: [40, 30, 50, 40, 55, 40, 70, 100, 110, 120, 150, 140] },
  ],
  options: {
    legend: { show: false, position: 'top', horizontalAlign: 'left' },
    colors: ['#0F4C81', '#00bfff'],
    chart: {
      fontFamily: 'Outfit, sans-serif',
      height: 310,
      type: 'area',
      toolbar: { show: false },
    },
    fill: { gradient: { enabled: true, opacityFrom: 0.55, opacityTo: 0 } },
    stroke: { curve: 'straight', width: [2, 2] },
    markers: { size: 0 },
    grid: {
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
    },
    dataLabels: { enabled: false },
    tooltip: { x: { format: 'dd MMM yyyy' } },
    xaxis: {
      type: 'category',
      categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      axisBorder: { show: false },
      axisTicks: { show: false },
      tooltip: { enabled: false },
    },
    yaxis: { title: { style: { fontSize: '0px' } } },
  },
};

export const ChartThree = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white px-5 pb-5 pt-5 dark:border-gray-800 dark:bg-white/[0.03] sm:px-6 sm:pt-6">
      <div className="flex flex-wrap items-start justify-between gap-3 sm:flex-nowrap">
        <div className="flex flex-wrap gap-3 sm:gap-4">
          <div className="flex items-center gap-2">
            <span className="block h-3 w-3 rounded-full bg-[#0F4C81]"></span>
            <span className="text-theme-sm text-gray-500 dark:text-gray-400">Sales</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="block h-3 w-3 rounded-full bg-[#00bfff]"></span>
            <span className="text-theme-sm text-gray-500 dark:text-gray-400">Revenue</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Statistics</h3>
        </div>
      </div>
      <div className="max-w-full overflow-x-auto custom-scrollbar">
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type="area"
          height={310}
        />
      </div>
    </div>
  );
};

export default ChartThree;
