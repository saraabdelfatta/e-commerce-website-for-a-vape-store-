import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumb from '../components/Breadcrumb';
import ReactApexChart from 'react-apexcharts';

// ─────────────────────────────────────────────
// DATA
// ─────────────────────────────────────────────

const salesData = [
  { id: '#1001', customer: 'Ahmed Hassan',  date: 'Jun 28, 2025', total: 1500, shipping: 50,  discount: 100, tax: 90,  final: 1540, status: 'Paid',     statusClass: 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500' },
  { id: '#1002', customer: 'Sara Ali',      date: 'Jun 27, 2025', total: 800,  shipping: 30,  discount: 0,   tax: 48,  final: 878,  status: 'Pending',  statusClass: 'bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400' },
  { id: '#1003', customer: 'Mohamed Khaled',date: 'Jun 26, 2025', total: 2300, shipping: 80,  discount: 200, tax: 132, final: 2312, status: 'Paid',     statusClass: 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500' },
  { id: '#1004', customer: 'Nour Ibrahim',  date: 'Jun 25, 2025', total: 650,  shipping: 25,  discount: 50,  tax: 37,  final: 662,  status: 'Overdue',  statusClass: 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500' },
  { id: '#1005', customer: 'Youssef Tarek', date: 'Jun 24, 2025', total: 1200, shipping: 40,  discount: 0,   tax: 72,  final: 1312, status: 'Paid',     statusClass: 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500' },
];

const expenseData = [
  { id: 'e1', name: 'Warehouse Rent',         category: 'Rent',        amount: 15000, date: 'Jun 1, 2025',  notes: 'Monthly rent' },
  { id: 'e2', name: 'Staff Salaries',         category: 'Salaries',    amount: 32000, date: 'Jun 1, 2025',  notes: '4 employees' },
  { id: 'e3', name: 'Instagram & Facebook Ads', category: 'Marketing', amount: 8000,  date: 'Jun 5, 2025',  notes: 'Summer campaign' },
  { id: 'e4', name: 'DHL Shipping Fees',      category: 'Shipping',    amount: 3200,  date: 'Jun 10, 2025', notes: 'Monthly courier' },
  { id: 'e5', name: 'Electricity Bill',       category: 'Utilities',   amount: 2100,  date: 'Jun 15, 2025', notes: 'June bill' },
  { id: 'e6', name: 'SMOK Stock Order',       category: 'Inventory',   amount: 45000, date: 'Jun 18, 2025', notes: 'New stock batch' },
  { id: 'e7', name: 'Packaging Materials',    category: 'Miscellaneous', amount: 1800, date: 'Jun 20, 2025', notes: 'Boxes & bags' },
];

const inventoryData = [
  { product: 'SMOK RPM 5 Kit',       cost: 350, price: 550, stock: 40 },
  { product: 'Vaporesso XROS 4',     cost: 280, price: 420, stock: 25 },
  { product: 'Elf Bar 5000 (Box)',    cost: 120, price: 200, stock: 60 },
  { product: 'Nasty Juice 60ml',     cost: 45,  price: 85,  stock: 120 },
  { product: 'Smok Coils Pack',      cost: 60,  price: 110, stock: 80 },
  { product: 'Voopoo Drag S Pod',    cost: 420, price: 650, stock: 15 },
];

const customerDebtData = [
  { name: 'Ahmed Hassan',   amount: 1540,  paid: 1000, due: 'Jul 5, 2025',  status: 'Partially Paid', statusClass: 'bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400' },
  { name: 'Sara Ali',       amount: 878,   paid: 0,    due: 'Jul 3, 2025',  status: 'Pending',        statusClass: 'bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400' },
  { name: 'Nour Ibrahim',   amount: 662,   paid: 0,    due: 'Jun 20, 2025', status: 'Overdue',        statusClass: 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500' },
  { name: 'Youssef Tarek',  amount: 1312,  paid: 1312, due: 'Jun 24, 2025', status: 'Paid',           statusClass: 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500' },
];

const supplierData = [
  { supplier: 'SMOK Official Egypt',    invoice: 'INV-001', amount: 45000, paid: 45000, remaining: 0,     status: 'Paid',    statusClass: 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500' },
  { supplier: 'VapeZone Distributor',   invoice: 'INV-002', amount: 28000, paid: 15000, remaining: 13000, status: 'Partial', statusClass: 'bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400' },
  { supplier: 'Nasty Juice MENA',       invoice: 'INV-003', amount: 12000, paid: 0,     remaining: 12000, status: 'Unpaid',  statusClass: 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500' },
  { supplier: 'Voopoo Cairo Agent',     invoice: 'INV-004', amount: 19500, paid: 19500, remaining: 0,     status: 'Paid',    statusClass: 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500' },
];

// ─────────────────────────────────────────────
// CHART CONFIGS
// ─────────────────────────────────────────────

const revenueExpenseChart = {
  series: [
    { name: 'Revenue',  data: [42000, 38000, 51000, 47000, 53000, 61000, 58000, 67000, 72000, 68000, 75000, 81000] },
    { name: 'Expenses', data: [21000, 24000, 22000, 26000, 23000, 28000, 25000, 31000, 29000, 32000, 30000, 34000] },
  ],
  options: {
    chart: { type: 'area', height: 280, toolbar: { show: false }, fontFamily: 'Outfit, sans-serif' },
    colors: ['#0F4C81', '#00bfff'],
    stroke: { curve: 'smooth', width: [2, 2] },
    fill: { type: 'gradient', gradient: { opacityFrom: 0.35, opacityTo: 0 } },
    dataLabels: { enabled: false },
    legend: { show: true, position: 'top', horizontalAlign: 'left' },
    xaxis: { categories: ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'], axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: v => v.toLocaleString() + ' EGP' } },
    grid: { yaxis: { lines: { show: true } }, xaxis: { lines: { show: false } } },
    tooltip: { y: { formatter: v => v.toLocaleString() + ' EGP' } },
  },
};

const expenseBreakdownChart = {
  series: [32000, 15000, 8000, 3200, 2100, 45000, 1800],
  options: {
    chart: { type: 'donut', height: 260, fontFamily: 'Outfit, sans-serif' },
    colors: ['#0F4C81', '#00bfff', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#6b7280'],
    labels: ['Salaries', 'Rent', 'Marketing', 'Shipping', 'Utilities', 'Inventory', 'Misc'],
    legend: { position: 'bottom', fontSize: '12px' },
    dataLabels: { enabled: false },
    plotOptions: { pie: { donut: { size: '65%' } } },
    tooltip: { y: { formatter: v => v.toLocaleString() + ' EGP' } },
  },
};

const cashFlowChart = {
  series: [
    { name: 'Cash In',  data: [18000, 22000, 19000, 25000, 28000, 31000] },
    { name: 'Cash Out', data: [12000, 15000, 11000, 18000, 16000, 20000] },
  ],
  options: {
    chart: { type: 'bar', height: 220, toolbar: { show: false }, fontFamily: 'Outfit, sans-serif' },
    colors: ['#0F4C81', '#ef4444'],
    plotOptions: { bar: { horizontal: false, columnWidth: '45%', borderRadius: 4 } },
    dataLabels: { enabled: false },
    legend: { show: true, position: 'top', horizontalAlign: 'left' },
    xaxis: { categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'], axisBorder: { show: false }, axisTicks: { show: false } },
    yaxis: { labels: { formatter: v => v.toLocaleString() } },
    grid: { yaxis: { lines: { show: true } }, xaxis: { lines: { show: false } } },
    tooltip: { y: { formatter: v => v.toLocaleString() + ' EGP' } },
  },
};

// ─────────────────────────────────────────────
// REUSABLE COMPONENTS
// ─────────────────────────────────────────────

const MetricCard = ({ title, value, sub, positive, icon, color = 'gray' }) => {
  const colors = {
    gray:    'bg-gray-100 dark:bg-gray-800',
    blue:    'bg-blue-50 dark:bg-blue-900/20',
    green:   'bg-success-50 dark:bg-success-500/10',
    red:     'bg-error-50 dark:bg-error-500/10',
    yellow:  'bg-warning-50 dark:bg-warning-500/10',
    purple:  'bg-purple-50 dark:bg-purple-900/20',
  };
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
      <div className={`flex h-12 w-12 items-center justify-center rounded-xl ${colors[color]}`}>
        {icon}
      </div>
      <div className="mt-4">
        <span className="text-sm text-gray-500 dark:text-gray-400">{title}</span>
        <h4 className="mt-1 text-xl font-bold text-gray-800 dark:text-white/90">{value}</h4>
        {sub && (
          <p className={`mt-1 text-xs font-medium ${positive ? 'text-success-600' : 'text-error-600'}`}>
            {positive ? '▲' : '▼'} {sub}
          </p>
        )}
      </div>
    </div>
  );
};

const SectionCard = ({ title, children }) => (
  <div className="rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] overflow-hidden">
    <div className="px-5 py-4 border-b border-gray-100 dark:border-gray-800">
      <h3 className="text-base font-semibold text-gray-800 dark:text-white/90">{title}</h3>
    </div>
    <div className="p-5">{children}</div>
  </div>
);

const Badge = ({ label, className }) => (
  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${className}`}>{label}</span>
);

const TabBar = ({ tabs, active, onChange }) => (
  <div className="flex gap-2 flex-wrap">
    {tabs.map(t => (
      <button key={t} onClick={() => onChange(t)}
        className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
          active === t
            ? 'bg-brand-500 text-white'
            : 'border border-gray-200 bg-white text-gray-600 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.05]'
        }`}>
        {t}
      </button>
    ))}
  </div>
);

// ─────────────────────────────────────────────
// SECTIONS
// ─────────────────────────────────────────────

// 1. Financial Overview Cards
const FinancialOverview = () => (
  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4 md:gap-6">
    <MetricCard color="blue"   positive={true}  title="Total Revenue"      value="250,000 EGP" sub="12.5% vs last month" icon={<svg className="fill-blue-600" width="22" height="22" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2.25C6.615 2.25 2.25 6.615 2.25 12S6.615 21.75 12 21.75 21.75 17.385 21.75 12 17.385 2.25 12 2.25Zm.75 4.75a.75.75 0 0 0-1.5 0v.378C9.745 7.694 8.75 8.98 8.75 10.417c0 1.741 1.426 3.083 3.125 3.083.862 0 1.625.738 1.625 1.625S12.737 16.75 11.875 16.75s-1.625-.737-1.625-1.625a.75.75 0 0 0-1.5 0c0 1.437.995 2.723 2.5 3.039V18.5a.75.75 0 0 0 1.5 0v-.336c1.505-.316 2.5-1.602 2.5-3.039 0-1.71-1.367-3.125-3.125-3.125-.862 0-1.625-.738-1.625-1.625s.763-1.625 1.625-1.625 1.625.738 1.625 1.625a.75.75 0 0 0 1.5 0c0-1.437-.995-2.723-2.5-3.039V7Z" fill=""/></svg>} />
    <MetricCard color="red"    positive={false} title="Total Expenses"     value="180,000 EGP" sub="4.2% vs last month"  icon={<svg className="fill-error-600" width="22" height="22" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M3.25 6.5A2.75 2.75 0 0 1 6 3.75h12A2.75 2.75 0 0 1 20.75 6.5v11a2.75 2.75 0 0 1-2.75 2.75H6A2.75 2.75 0 0 1 3.25 17.5v-11ZM6 5.25A1.25 1.25 0 0 0 4.75 6.5v11A1.25 1.25 0 0 0 6 18.75h12A1.25 1.25 0 0 0 19.25 17.5v-11A1.25 1.25 0 0 0 18 5.25H6Zm1.25 4.25a.75.75 0 0 1 .75-.75h8a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75Zm0 3a.75.75 0 0 1 .75-.75h5a.75.75 0 0 1 0 1.5H8a.75.75 0 0 1-.75-.75Z" fill=""/></svg>} />
    <MetricCard color="green"  positive={true}  title="Net Profit"         value="70,000 EGP"  sub="8.1% vs last month"  icon={<svg className="fill-success-600" width="22" height="22" viewBox="0 0 24 24"><path d="M2.25 18a.75.75 0 0 0 0 1.5h19.5a.75.75 0 0 0 0-1.5H2.25ZM15.22 9.22a.75.75 0 1 1 1.06 1.06L13.06 13.5 9.53 10l-4.28 4.28a.75.75 0 1 1-1.06-1.06l4.81-4.81 3.5 3.5 2.72-2.72Z" fill=""/></svg>} />
    <MetricCard color="yellow" positive={false} title="Pending Payments"   value="15,000 EGP"  sub="2.3% vs last month"  icon={<svg className="fill-warning-600" width="22" height="22" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M12 2.75C6.891 2.75 2.75 6.891 2.75 12S6.891 21.25 12 21.25 21.25 17.109 21.25 12 17.109 2.75 12 2.75Zm.75 4.25a.75.75 0 0 0-1.5 0v5l3.5 2.5a.75.75 0 0 0 .875-1.217L12.75 11.25V7Z" fill=""/></svg>} />
    <MetricCard color="purple" positive={true}  title="Cash Balance"       value="42,000 EGP"  sub="healthy balance"      icon={<svg className="fill-purple-600" width="22" height="22" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M2.25 5.5A2.75 2.75 0 0 1 5 2.75h14A2.75 2.75 0 0 1 21.75 5.5v13A2.75 2.75 0 0 1 19 21.25H5A2.75 2.75 0 0 1 2.25 18.5v-13ZM5 4.25A1.25 1.25 0 0 0 3.75 5.5V7h16.5V5.5A1.25 1.25 0 0 0 19 4.25H5Zm15.25 4.25H3.75V18.5A1.25 1.25 0 0 0 5 19.75h14A1.25 1.25 0 0 0 20.25 18.5V8.5Zm-4 5.25a1 1 0 1 0 0-2 1 1 0 0 0 0 2Z" fill=""/></svg>} />
    <MetricCard color="blue"   positive={false} title="Outstanding Payables" value="25,000 EGP" sub="to suppliers"        icon={<svg className="fill-blue-600" width="22" height="22" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M7.5 3.75A3.75 3.75 0 0 0 3.75 7.5v9a3.75 3.75 0 0 0 3.75 3.75h9a3.75 3.75 0 0 0 3.75-3.75v-9A3.75 3.75 0 0 0 16.5 3.75h-9Zm4.5 3a.75.75 0 0 1 .75.75v3.69l1.72-1.72a.75.75 0 1 1 1.06 1.06l-3 3a.75.75 0 0 1-1.06 0l-3-3a.75.75 0 1 1 1.06-1.06l1.72 1.72V7.5A.75.75 0 0 1 12 6.75Z" fill=""/></svg>} />
    <MetricCard color="red"    positive={false} title="Outstanding Receivables" value="8,000 EGP" sub="from customers"   icon={<svg className="fill-error-600" width="22" height="22" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M7.5 3.75A3.75 3.75 0 0 0 3.75 7.5v9a3.75 3.75 0 0 0 3.75 3.75h9a3.75 3.75 0 0 0 3.75-3.75v-9A3.75 3.75 0 0 0 16.5 3.75h-9Zm4.5 10.5a.75.75 0 0 1-.75-.75V9.81L9.53 11.53a.75.75 0 0 1-1.06-1.06l3-3a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72v3.69a.75.75 0 0 1-.75.75Z" fill=""/></svg>} />
    <MetricCard color="green"  positive={true}  title="Monthly P&L"        value="+12,500 EGP" sub="profit this month"   icon={<svg className="fill-success-600" width="22" height="22" viewBox="0 0 24 24"><path fillRule="evenodd" clipRule="evenodd" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674h4.911c.969 0 1.371 1.24.588 1.81l-3.976 2.888 1.519 4.674c.3.921-.755 1.688-1.538 1.118l-3.976-2.888-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.519-4.674L3.393 9.41c-.783-.57-.38-1.81.588-1.81h4.911l1.519-4.674Z" fill=""/></svg>} />
  </div>
);

// 2. P&L Statement
const ProfitLoss = () => {
  const [period, setPeriod] = useState('This Month');
  const periods = ['Today', 'This Week', 'This Month', 'Custom'];
  const revenue   = 250000;
  const cogs      = 107000;
  const gross     = revenue - cogs;
  const opex      = 62100;
  const net       = gross - opex;

  const Row = ({ label, value, bold, indent, red }) => (
    <div className={`flex justify-between py-2 ${bold ? 'font-semibold' : ''} ${indent ? 'pl-4' : ''} border-b border-gray-50 dark:border-gray-800`}>
      <span className={`text-sm ${bold ? 'text-gray-800 dark:text-white/90' : 'text-gray-500 dark:text-gray-400'}`}>{label}</span>
      <span className={`text-sm font-medium ${red ? 'text-error-600' : bold ? 'text-gray-800 dark:text-white/90' : 'text-gray-700 dark:text-gray-300'}`}>{value}</span>
    </div>
  );

  return (
    <SectionCard title="Profit & Loss Statement">
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">Auto-calculated from your data</p>
        <TabBar tabs={periods} active={period} onChange={setPeriod} />
      </div>
      <div className="space-y-0">
        <Row label="Total Revenue"             value="250,000 EGP" bold />
        <Row label="Cost of Goods Sold (COGS)" value="-107,000 EGP" indent red />
        <div className="flex justify-between py-3 bg-gray-50 dark:bg-white/[0.02] px-3 rounded-lg my-1">
          <span className="text-sm font-bold text-gray-800 dark:text-white/90">Gross Profit</span>
          <span className="text-sm font-bold text-success-600">{gross.toLocaleString()} EGP</span>
        </div>
        <Row label="Salaries"   value="-32,000 EGP" indent red />
        <Row label="Rent"       value="-15,000 EGP" indent red />
        <Row label="Marketing"  value="-8,000 EGP"  indent red />
        <Row label="Shipping"   value="-3,200 EGP"  indent red />
        <Row label="Utilities"  value="-2,100 EGP"  indent red />
        <Row label="Other Opex" value="-1,800 EGP"  indent red />
        <div className="flex justify-between py-3 bg-brand-50 dark:bg-brand-500/10 px-3 rounded-lg mt-1">
          <span className="text-sm font-bold text-gray-800 dark:text-white/90">Net Profit</span>
          <span className="text-sm font-bold text-brand-500">{net.toLocaleString()} EGP</span>
        </div>
      </div>
    </SectionCard>
  );
};

// 3. Sales Accounting Table
const SalesAccounting = () => {
  const [filter, setFilter] = useState('All');
  const tabs = ['All', 'Paid', 'Pending', 'Overdue'];
  const filtered = filter === 'All' ? salesData : salesData.filter(r => r.status === filter);

  return (
    <SectionCard title="Sales Accounting">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <p className="text-sm text-gray-500 dark:text-gray-400">Orders with full financial breakdown</p>
        <TabBar tabs={tabs} active={filter} onChange={setFilter} />
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-y border-gray-100 dark:border-gray-800">
              {['Order','Customer','Date','Total','Shipping','Discount','VAT (6%)','Final','Status'].map(h => (
                <th key={h} className="py-3 pr-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.map((r, i) => (
              <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="py-3 pr-4 text-sm font-semibold text-brand-500">{r.id}</td>
                <td className="py-3 pr-4 text-sm font-medium text-gray-800 dark:text-white/90 whitespace-nowrap">{r.customer}</td>
                <td className="py-3 pr-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{r.date}</td>
                <td className="py-3 pr-4 text-sm text-gray-700 dark:text-gray-300">{r.total.toLocaleString()}</td>
                <td className="py-3 pr-4 text-sm text-gray-700 dark:text-gray-300">{r.shipping}</td>
                <td className="py-3 pr-4 text-sm text-error-600">-{r.discount}</td>
                <td className="py-3 pr-4 text-sm text-gray-700 dark:text-gray-300">{r.tax}</td>
                <td className="py-3 pr-4 text-sm font-bold text-gray-800 dark:text-white/90">{r.final.toLocaleString()} EGP</td>
                <td className="py-3"><Badge label={r.status} className={r.statusClass} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
};

// 4. Expense Management
const ExpenseManagement = () => {
  const categories = ['All','Rent','Salaries','Marketing','Shipping','Utilities','Inventory','Miscellaneous'];
  const [showForm, setShowForm] = useState(false);
  const [cat, setCat] = useState('All');
  const [expenses, setExpenses] = useState([]);
  const [form, setForm] = useState({ name: '', category: 'Rent', amount: '', date: '', notes: '' });

  useEffect(() => {
    const stored = localStorage.getItem('adminExpenseData');
    setExpenses(stored ? JSON.parse(stored) : expenseData);
  }, []);

  useEffect(() => {
    localStorage.setItem('adminExpenseData', JSON.stringify(expenses));
  }, [expenses]);

  const filtered = cat === 'All' ? expenses : expenses.filter(e => e.category === cat);
  const total = filtered.reduce((s, e) => s + Number(e.amount || 0), 0);

  const catColors = {
    Rent: 'bg-blue-50 text-blue-600 dark:bg-blue-500/15 dark:text-blue-400',
    Salaries: 'bg-purple-50 text-purple-600 dark:bg-purple-500/15 dark:text-purple-400',
    Marketing: 'bg-warning-50 text-warning-600 dark:bg-warning-500/15 dark:text-orange-400',
    Shipping: 'bg-sky-50 text-sky-600 dark:bg-sky-500/15 dark:text-sky-400',
    Utilities: 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-300',
    Inventory: 'bg-success-50 text-success-600 dark:bg-success-500/15 dark:text-success-500',
    Miscellaneous: 'bg-error-50 text-error-600 dark:bg-error-500/15 dark:text-error-500',
  };

  return (
    <SectionCard title="Expense Management">
      <div className="flex items-center justify-between mb-4 flex-wrap gap-3">
        <div className="flex items-center gap-3">
          <p className="text-sm text-gray-500 dark:text-gray-400">Total: <span className="font-bold text-error-600">{total.toLocaleString()} EGP</span></p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <select value={cat} onChange={e => setCat(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300">
            {categories.map(c => <option key={c}>{c}</option>)}
          </select>
          <button onClick={() => setShowForm(!showForm)}
            className="rounded-lg bg-brand-500 px-4 py-1.5 text-sm font-medium text-white hover:bg-brand-600 transition-colors">
            + Add Expense
          </button>
        </div>
      </div>

      {showForm && (
        <div className="mb-4 p-4 rounded-xl border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-white/[0.02]">
          <h4 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">New Expense</h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { label: 'Expense Name', key: 'name', type: 'text', placeholder: 'e.g. Rent' },
              { label: 'Amount (EGP)', key: 'amount', type: 'number', placeholder: '0' },
              { label: 'Date', key: 'date', type: 'date', placeholder: '' },
            ].map((field) => (
              <div key={field.key}>
                <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">{field.label}</label>
                <input
                  type={field.type}
                  value={form[field.key]}
                  onChange={(e) => setForm((prev) => ({ ...prev, [field.key]: e.target.value }))}
                  placeholder={field.placeholder}
                  className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
                />
              </div>
            ))}
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Category</label>
              <select
                value={form.category}
                onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              >
                {categories.filter(c => c !== 'All').map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">Notes</label>
              <input
                type="text"
                value={form.notes}
                onChange={(e) => setForm((prev) => ({ ...prev, notes: e.target.value }))}
                placeholder="Optional notes"
                className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-800 dark:border-gray-700 dark:bg-gray-900 dark:text-white/90"
              />
            </div>
            <div className="flex items-end gap-2">
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setForm({ name: '', category: 'Rent', amount: '', date: '', notes: '' });
                }}
                className="flex-1 rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  if (!form.name || !form.amount || !form.date) return;
                  setExpenses((prev) => [
                    ...prev,
                    {
                      id: `e${Date.now()}`,
                      name: form.name,
                      category: form.category,
                      amount: Number(form.amount),
                      date: form.date,
                      notes: form.notes,
                    },
                  ]);
                  setForm({ name: '', category: 'Rent', amount: '', date: '', notes: '' });
                  setShowForm(false);
                }}
                className="flex-1 rounded-lg bg-brand-500 px-3 py-2 text-sm font-medium text-white hover:bg-brand-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="overflow-x-auto">
        <table className="min-w-full table-fixed border-collapse">
          <thead>
            <tr className="border-y border-gray-100 dark:border-gray-800">
              {['Expense','Category','Amount','Date','Notes','Actions'].map((h) => (
                <th
                  key={h}
                  className={`py-3 px-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-gray-400 ${
                    h === 'Expense' ? 'w-[24%]' :
                    h === 'Category' ? 'w-[14%]' :
                    h === 'Amount' ? 'w-[12%] text-right' :
                    h === 'Date' ? 'w-[14%]' :
                    h === 'Notes' ? 'w-[26%]' :
                    'w-[10%]'
                  }`}
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {filtered.map((e) => (
              <tr key={e.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                <td className="py-2 px-3 text-sm font-semibold text-gray-800 dark:text-white/90">{e.name}</td>
                <td className="py-2 px-3"><Badge label={e.category} className={catColors[e.category] || ''} /></td>
                <td className="py-2 px-3 text-sm font-semibold text-error-600 text-right">{Number(e.amount).toLocaleString()} EGP</td>
                <td className="py-2 px-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{e.date}</td>
                <td className="py-2 px-3 text-sm text-gray-500 dark:text-gray-400">{e.notes}</td>
                <td className="py-2 px-3">
                  <button
                    type="button"
                    onClick={() => setExpenses((prev) => prev.filter((item) => item.id !== e.id))}
                    className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-white/[0.06]"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
};

// 5. Inventory Cost Tracking
const InventoryCost = () => {
  const totalValue    = inventoryData.reduce((s, p) => s + p.price * p.stock, 0);
  const totalCost     = inventoryData.reduce((s, p) => s + p.cost * p.stock, 0);
  const expectedProfit = totalValue - totalCost;

  return (
    <SectionCard title="Inventory Cost Tracking">
      <div className="grid grid-cols-3 gap-3 mb-4">
        {[
          { label: 'Inventory Value', value: totalValue.toLocaleString() + ' EGP', color: 'text-brand-500' },
          { label: 'Inventory Cost',  value: totalCost.toLocaleString() + ' EGP',  color: 'text-error-600' },
          { label: 'Expected Profit', value: expectedProfit.toLocaleString() + ' EGP', color: 'text-success-600' },
        ].map(s => (
          <div key={s.label} className="rounded-xl bg-gray-50 dark:bg-white/[0.03] p-3 text-center">
            <p className="text-xs text-gray-500 dark:text-gray-400">{s.label}</p>
            <p className={`text-sm font-bold mt-1 ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="border-y border-gray-100 dark:border-gray-800">
              {['Product','Cost Price','Selling Price','Margin','Stock','Total Value'].map(h => (
                <th key={h} className="py-3 pr-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {inventoryData.map((p, i) => {
              const margin = (((p.price - p.cost) / p.price) * 100).toFixed(0);
              return (
                <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
                  <td className="py-3 pr-4 text-sm font-medium text-gray-800 dark:text-white/90">{p.product}</td>
                  <td className="py-3 pr-4 text-sm text-error-600 font-medium">{p.cost} EGP</td>
                  <td className="py-3 pr-4 text-sm text-success-600 font-medium">{p.price} EGP</td>
                  <td className="py-3 pr-4">
                    <span className="rounded-full bg-success-50 dark:bg-success-500/15 px-2 py-0.5 text-xs font-bold text-success-600 dark:text-success-500">{margin}%</span>
                  </td>
                  <td className="py-3 pr-4 text-sm text-gray-700 dark:text-gray-300">{p.stock} units</td>
                  <td className="py-3 text-sm font-semibold text-gray-800 dark:text-white/90">{(p.price * p.stock).toLocaleString()} EGP</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </SectionCard>
  );
};

// 6. Customer Debt Management
const CustomerDebts = () => (
  <SectionCard title="Customer Debt Management">
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-y border-gray-100 dark:border-gray-800">
            {['Customer','Total Due','Amount Paid','Remaining','Due Date','Status'].map(h => (
              <th key={h} className="py-3 pr-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {customerDebtData.map((c, i) => (
            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
              <td className="py-3 pr-4 text-sm font-medium text-gray-800 dark:text-white/90">{c.name}</td>
              <td className="py-3 pr-4 text-sm text-gray-700 dark:text-gray-300">{c.amount.toLocaleString()} EGP</td>
              <td className="py-3 pr-4 text-sm text-success-600 font-medium">{c.paid.toLocaleString()} EGP</td>
              <td className="py-3 pr-4 text-sm font-bold text-error-600">{(c.amount - c.paid).toLocaleString()} EGP</td>
              <td className="py-3 pr-4 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap">{c.due}</td>
              <td className="py-3"><Badge label={c.status} className={c.statusClass} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </SectionCard>
);

// 7. Supplier Accounting
const SupplierAccounting = () => (
  <SectionCard title="Supplier Accounting">
    <div className="overflow-x-auto">
      <table className="min-w-full">
        <thead>
          <tr className="border-y border-gray-100 dark:border-gray-800">
            {['Supplier','Invoice #','Total Amount','Amount Paid','Remaining','Status'].map(h => (
              <th key={h} className="py-3 pr-4 text-left text-xs font-medium text-gray-500 dark:text-gray-400 whitespace-nowrap">{h}</th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
          {supplierData.map((s, i) => (
            <tr key={i} className="hover:bg-gray-50 dark:hover:bg-white/[0.02] transition-colors">
              <td className="py-3 pr-4 text-sm font-medium text-gray-800 dark:text-white/90">{s.supplier}</td>
              <td className="py-3 pr-4 text-sm text-brand-500 font-medium">{s.invoice}</td>
              <td className="py-3 pr-4 text-sm text-gray-700 dark:text-gray-300">{s.amount.toLocaleString()} EGP</td>
              <td className="py-3 pr-4 text-sm text-success-600 font-medium">{s.paid.toLocaleString()} EGP</td>
              <td className="py-3 pr-4 text-sm font-bold text-error-600">{s.remaining.toLocaleString()} EGP</td>
              <td className="py-3"><Badge label={s.status} className={s.statusClass} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </SectionCard>
);

// 8. VAT / Tax
const VatManagement = () => {
  const vatCollected = 6706;
  const vatPaid      = 3200;
  const vatDue       = vatCollected - vatPaid;

  return (
    <SectionCard title="VAT / Tax Management (Egypt 14%)">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
        {[
          { label: 'VAT Collected (from customers)', value: vatCollected.toLocaleString() + ' EGP', color: 'text-brand-500' },
          { label: 'VAT Paid (to suppliers)',         value: vatPaid.toLocaleString() + ' EGP',      color: 'text-gray-700 dark:text-gray-300' },
          { label: 'VAT Due to Government',           value: vatDue.toLocaleString() + ' EGP',       color: 'text-error-600' },
        ].map(s => (
          <div key={s.label} className="rounded-xl bg-gray-50 dark:bg-white/[0.03] p-4">
            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">{s.label}</p>
            <p className={`text-lg font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mt-2">
        * Based on current month transactions. VAT rate: 14% (Egypt standard rate).
      </p>
    </SectionCard>
  );
};

// ─────────────────────────────────────────────
// MAIN PAGE
// ─────────────────────────────────────────────

export const AdminAccounting = () => {
  const location = useLocation();

  const sectionKey = location.pathname.replace('/admin/accounting', '').replace(/^\//, '');
  const sectionMap = {
    '': 'Overview',
    overview: 'Overview',
    revenue: 'Revenue',
    expenses: 'Expenses',
    'profit-loss': 'Profit & Loss',
    pl: 'P&L',
    'cash-flow': 'Cash Flow',
    invoices: 'Invoices',
    suppliers: 'Suppliers',
    'customer-debts': 'Customer Debts',
    taxes: 'Taxes',
    vat: 'VAT',
    reports: 'Reports',
    inventory: 'Inventory',
    sales: 'Sales',
  };
  const activeSection = sectionMap[sectionKey] || 'Overview';

  return (
    <>
      <Breadcrumb pageName="Accounting" />

      {/* Section Content */}
      <div className="space-y-6">

        {activeSection === 'Overview' && (
          <>
            <FinancialOverview />
            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <div className="col-span-12 xl:col-span-8 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <h3 className="text-base font-semibold text-gray-800 dark:text-white/90 mb-1">Revenue vs Expenses</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Monthly 2025</p>
                <ReactApexChart options={revenueExpenseChart.options} series={revenueExpenseChart.series} type="area" height={280} />
              </div>
              <div className="col-span-12 xl:col-span-4 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
                <h3 className="text-base font-semibold text-gray-800 dark:text-white/90 mb-1">Expense Breakdown</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">By category</p>
                <ReactApexChart options={expenseBreakdownChart.options} series={expenseBreakdownChart.series} type="donut" height={260} />
              </div>
            </div>
          </>
        )}

        {activeSection === 'P&L'            && <ProfitLoss />}
        {activeSection === 'Sales'          && <SalesAccounting />}
        {activeSection === 'Expenses'       && <ExpenseManagement />}
        {activeSection === 'Inventory'      && <InventoryCost />}
        {activeSection === 'Customer Debts' && <CustomerDebts />}
        {activeSection === 'Suppliers'      && <SupplierAccounting />}
        {activeSection === 'VAT'            && <VatManagement />}
        {activeSection === 'Revenue'        && (
          <SectionCard title="Revenue">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
              Revenue analytics and monthly growth trends are shown here.
            </p>
            <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <ReactApexChart options={revenueExpenseChart.options} series={[revenueExpenseChart.series[0]]} type="area" height={280} />
            </div>
          </SectionCard>
        )}
        {activeSection === 'Invoices'      && (
          <SectionCard title="Invoices">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Invoices will appear here once your accounting workflow is connected.
            </p>
          </SectionCard>
        )}
        {activeSection === 'Taxes'         && (
          <SectionCard title="Taxes">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Tax summaries and declarations are managed in this section.
            </p>
          </SectionCard>
        )}
        {activeSection === 'Reports'       && (
          <SectionCard title="Reports">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Consolidated financial reports and export options are available here.
            </p>
          </SectionCard>
        )}
        {activeSection === 'Cash Flow' && (
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <div className="col-span-12 xl:col-span-8 rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03]">
              <h3 className="text-base font-semibold text-gray-800 dark:text-white/90 mb-1">Cash Flow</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Cash In vs Cash Out — last 6 months</p>
              <ReactApexChart options={cashFlowChart.options} series={cashFlowChart.series} type="bar" height={280} />
            </div>
            <div className="col-span-12 xl:col-span-4 space-y-4">
              {[
                { label: 'Total Cash In',   value: '143,000 EGP', color: 'text-brand-500',   bg: 'bg-blue-50 dark:bg-blue-900/20' },
                { label: 'Total Cash Out',  value: '92,000 EGP',  color: 'text-error-600',   bg: 'bg-error-50 dark:bg-error-500/10' },
                { label: 'Net Cash Flow',   value: '51,000 EGP',  color: 'text-success-600', bg: 'bg-success-50 dark:bg-success-500/10' },
              ].map(s => (
                <div key={s.label} className={`rounded-2xl border border-gray-200 dark:border-gray-800 p-5 ${s.bg}`}>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{s.label}</p>
                  <p className={`text-2xl font-bold mt-2 ${s.color}`}>{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        )}

      </div>
    </>
  );
};

export default AdminAccounting;
