import React from 'react';
import ReactApexChart from 'react-apexcharts';

const chartOptions = {
  series: [75.55],
  options: {
    colors: ['#0F4C81'],
    chart: {
      fontFamily: 'Outfit, sans-serif',
      type: 'radialBar',
      height: 330,
      sparkline: { enabled: true },
    },
    plotOptions: {
      radialBar: {
        startAngle: -90,
        endAngle: 90,
        hollow: { size: '80%' },
        track: { background: '#E4E7EC', strokeWidth: '100%', margin: 5 },
        dataLabels: {
          name: { show: false },
          value: {
            fontSize: '36px',
            fontWeight: '600',
            offsetY: 60,
            color: '#1D2939',
            formatter: (val) => val + '%',
          },
        },
      },
    },
    fill: { type: 'solid', colors: ['#0F4C81'] },
    stroke: { lineCap: 'round' },
    labels: ['Progress'],
  },
};

export const ChartTwo = () => {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Revenue Overview</h3>
          <p className="mt-1 text-gray-500 text-theme-sm dark:text-gray-400">Monthly targets</p>
        </div>
      </div>
      <div className="relative">
        <ReactApexChart
          options={chartOptions.options}
          series={chartOptions.series}
          type="radialBar"
          height={330}
        />
      </div>
      <div className="flex items-center justify-center gap-5 pt-4">
        <div className="flex items-center gap-1.5">
          <span className="block h-3 w-3 rounded-full bg-[#0F4C81]"></span>
          <span className="text-theme-xs text-gray-500 dark:text-gray-400">Target</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="block h-3 w-3 rounded-full bg-[#00bfff]"></span>
          <span className="text-theme-xs text-gray-500 dark:text-gray-400">Revenue</span>
        </div>
      </div>
    </div>
  );
};

export default ChartTwo;
