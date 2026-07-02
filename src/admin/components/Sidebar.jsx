import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from './Logo';

const menuItems = [
  {
    name: 'Dashboard',
    href: '/admin/dashboard',
    page: 'dashboard',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M5.5 3.25C4.25736 3.25 3.25 4.25736 3.25 5.5V8.99998C3.25 10.2426 4.25736 11.25 5.5 11.25H9C10.2426 11.25 11.25 10.2426 11.25 8.99998V5.5C11.25 4.25736 10.2426 3.25 9 3.25H5.5ZM4.75 5.5C4.75 5.08579 5.08579 4.75 5.5 4.75H9C9.41421 4.75 9.75 5.08579 9.75 5.5V8.99998C9.75 9.41419 9.41421 9.74998 9 9.74998H5.5C5.08579 9.74998 4.75 9.41419 4.75 8.99998V5.5ZM5.5 12.75C4.25736 12.75 3.25 13.7574 3.25 15V18.5C3.25 19.7426 4.25736 20.75 5.5 20.75H9C10.2426 20.75 11.25 19.7427 11.25 18.5V15C11.25 13.7574 10.2426 12.75 9 12.75H5.5ZM4.75 15C4.75 14.5858 5.08579 14.25 5.5 14.25H9C9.41421 14.25 9.75 14.5858 9.75 15V18.5C9.75 18.9142 9.41421 19.25 9 19.25H5.5C5.08579 19.25 4.75 18.9142 4.75 18.5V15ZM12.75 5.5C12.75 4.25736 13.7574 3.25 15 3.25H18.5C19.7426 3.25 20.75 4.25736 20.75 5.5V8.99998C20.75 10.2426 19.7426 11.25 18.5 11.25H15C13.7574 11.25 12.75 10.2426 12.75 8.99998V5.5ZM15 4.75C14.5858 4.75 14.25 5.08579 14.25 5.5V8.99998C14.25 9.41419 14.5858 9.74998 15 9.74998H18.5C18.9142 9.74998 19.25 9.41419 19.25 8.99998V5.5C19.25 5.08579 18.9142 4.75 18.5 4.75H15ZM15 12.75C13.7574 12.75 12.75 13.7574 12.75 15V18.5C12.75 19.7426 13.7574 20.75 15 20.75H18.5C19.7426 20.75 20.75 19.7427 20.75 18.5V15C20.75 13.7574 19.7426 12.75 18.5 12.75H15ZM14.25 15C14.25 14.5858 14.5858 14.25 15 14.25H18.5C18.9142 14.25 19.25 14.5858 19.25 15V18.5C19.25 18.9142 18.9142 19.25 18.5 19.25H15C14.5858 19.25 14.25 18.9142 14.25 18.5V15Z" fill="" />
      </svg>
    ),
  },
  {
    name: 'Profile',
    href: '/admin/profile',
    page: 'profile',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M12 3.5C7.30558 3.5 3.5 7.30558 3.5 12C3.5 14.1526 4.3002 16.1184 5.61936 17.616C6.17279 15.3096 8.24852 13.5955 10.7246 13.5955H13.2746C15.7509 13.5955 17.8268 15.31 18.38 17.6167C19.6996 16.119 20.5 14.153 20.5 12C20.5 7.30558 16.6944 3.5 12 3.5ZM17.0246 18.8566V18.8455C17.0246 16.7744 15.3457 15.0955 13.2746 15.0955H10.7246C8.65354 15.0955 6.97461 16.7744 6.97461 18.8455V18.856C8.38223 19.8895 10.1198 20.5 12 20.5C13.8798 20.5 15.6171 19.8898 17.0246 18.8566ZM2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12ZM11.9991 7.25C10.8847 7.25 9.98126 8.15342 9.98126 9.26784C9.98126 10.3823 10.8847 11.2857 11.9991 11.2857C13.1135 11.2857 14.0169 10.3823 14.0169 9.26784C14.0169 8.15342 13.1135 7.25 11.9991 7.25ZM8.48126 9.26784C8.48126 7.32499 10.0563 5.75 11.9991 5.75C13.9419 5.75 15.5169 7.32499 15.5169 9.26784C15.5169 11.2107 13.9419 12.7857 11.9991 12.7857C10.0563 12.7857 8.48126 11.2107 8.48126 9.26784Z" fill="" />
      </svg>
    ),
  },
  {
    name: 'Inventory',
    href: '/admin/inventory',
    page: 'inventory',
    // icon removed per user request
  },
  {
    name: 'Accounting',
    href: '/admin/accounting',
    page: 'accounting',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M3.25 6.5C3.25 4.98122 4.48122 3.75 6 3.75H18C19.5188 3.75 20.75 4.98122 20.75 6.5V17.5C20.75 19.0188 19.5188 20.25 18 20.25H6C4.48122 20.25 3.25 19.0188 3.25 17.5V6.5ZM6 5.25C5.30964 5.25 4.75 5.80964 4.75 6.5V17.5C4.75 18.1904 5.30964 18.75 6 18.75H18C18.6904 18.75 19.25 18.1904 19.25 17.5V6.5C19.25 5.80964 18.6904 5.25 18 5.25H6ZM7.25 9.5C7.25 9.08579 7.58579 8.75 8 8.75H16C16.4142 8.75 16.75 9.08579 16.75 9.5C16.75 9.91421 16.4142 10.25 16 10.25H8C7.58579 10.25 7.25 9.91421 7.25 9.5ZM7.25 12.5C7.25 12.0858 7.58579 11.75 8 11.75H16C16.4142 11.75 16.75 12.0858 16.75 12.5C16.75 12.9142 16.4142 13.25 16 13.25H8C7.58579 13.25 7.25 12.9142 7.25 12.5ZM7.25 15.5C7.25 15.0858 7.58579 14.75 8 14.75H12C12.4142 14.75 12.75 15.0858 12.75 15.5C12.75 15.9142 12.4142 16.25 12 16.25H8C7.58579 16.25 7.25 15.9142 7.25 15.5Z" fill=""/>
      </svg>
    ),
    submenu: [
      { name: 'Financial Overview', href: '/admin/accounting/overview', icon: 'overview' },
      { name: 'Revenue', href: '/admin/accounting/revenue', icon: 'revenue' },
      { name: 'Expenses', href: '/admin/accounting/expenses', icon: 'expenses' },
      { name: 'Profit & Loss', href: '/admin/accounting/pl', icon: 'pl' },
      { name: 'Cash Flow', href: '/admin/accounting/cash-flow', icon: 'cash-flow' },
      { name: 'Invoices', href: '/admin/accounting/invoices', icon: 'invoices' },
      { name: 'Suppliers', href: '/admin/accounting/suppliers', icon: 'suppliers' },
      { name: 'Customer Debts', href: '/admin/accounting/customer-debts', icon: 'customer-debts' },
      { name: 'Taxes', href: '/admin/accounting/taxes', icon: 'taxes' },
      { name: 'Reports', href: '/admin/accounting/reports', icon: 'reports' },
    ],
  },
];

export const Sidebar = ({ sidebarToggle }) => {
  const location = useLocation();
  const [openDropdown, setOpenDropdown] = useState('');

  const currentPath = location.pathname;

  useEffect(() => {
    if (currentPath.startsWith('/admin/accounting')) {
      setOpenDropdown('Accounting');
    }
  }, [currentPath]);

  const toggleDropdown = (name) => {
    setOpenDropdown((prev) => (prev === name ? '' : name));
  };

  const isActive = (href) => currentPath === href || currentPath.startsWith(`${href}/`);

  return (
    <aside
      className={`sidebar fixed left-0 top-0 z-[9999] flex h-screen w-[290px] flex-col overflow-y-hidden border-r border-gray-200 bg-white px-5 dark:border-gray-800 dark:bg-black lg:static lg:translate-x-0 ${
        sidebarToggle ? 'translate-x-0 lg:w-[90px]' : '-translate-x-full'
      }`}
    >
      {/* Sidebar Header */}
      <div
        className={`flex items-center gap-2 pt-8 sidebar-header pb-7 ${
          sidebarToggle ? 'justify-center' : 'justify-between'
        }`}
      >
        <Logo collapsed={sidebarToggle} />
      </div>

      <div className="flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar">
        <nav>
          {/* MENU Group */}
          <div>
            <h3 className="mb-4 text-xs uppercase leading-[20px] text-gray-400">
              <span className={`menu-group-title ${sidebarToggle ? 'lg:hidden' : ''}`}>MENU</span>
              <svg className={`mx-auto fill-current menu-group-icon ${sidebarToggle ? 'lg:block hidden' : 'hidden'}`} width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M5.99915 10.2451C6.96564 10.2451 7.74915 11.0286 7.74915 11.9951V12.0051C7.74915 12.9716 6.96564 13.7551 5.99915 13.7551C5.03265 13.7551 4.24915 12.9716 4.24915 12.0051V11.9951C4.24915 11.0286 5.03265 10.2451 5.99915 10.2451ZM17.9991 10.2451C18.9656 10.2451 19.7491 11.0286 19.7491 11.9951V12.0051C19.7491 12.9716 18.9656 13.7551 17.9991 13.7551C17.0326 13.7551 16.2491 12.9716 16.2491 12.0051V11.9951C16.2491 11.0286 17.0326 10.2451 17.9991 10.2451ZM13.7491 11.9951C13.7491 11.0286 12.9656 10.2451 11.9991 10.2451C11.0326 10.2451 10.2491 11.0286 10.2491 11.9951V12.0051C10.2491 12.9716 11.0326 13.7551 11.9991 13.7551C12.9656 13.7551 13.7491 12.9716 13.7491 12.0051V11.9951Z" fill="" />
              </svg>
            </h3>

            <ul className="flex flex-col gap-4 mb-6">
              {menuItems.map((item) => {
                const active = isActive(item.href);
                return (
                  <li key={item.name}>
                    {item.submenu ? (
                      <div className="relative">
                        <div className={`menu-item group ${active ? 'menu-item-active' : 'menu-item-inactive'}`}>
                          <button
                            type="button"
                            onClick={() => toggleDropdown(item.name)}
                            className="flex-1 flex items-center gap-3 text-left"
                          >
                            <span className={active ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}>
                              {item.icon}
                            </span>
                            <span className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}>
                              {item.name}
                            </span>
                          </button>
                          <button
                            type="button"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              toggleDropdown(item.name);
                            }}
                            className={`menu-item-arrow ${openDropdown === item.name ? 'menu-item-arrow-active' : 'menu-item-arrow-inactive'} ${sidebarToggle ? 'hidden' : ''}`}
                            aria-label={`${openDropdown === item.name ? 'Collapse' : 'Expand'} ${item.name} submenu`}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 9l6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        </div>
                        <div className={`${openDropdown === item.name && !sidebarToggle ? 'flex' : 'hidden'} menu-dropdown flex-col gap-2 mt-2`}> 
                          {item.submenu.map((sub) => (
                            <Link
                              key={sub.name}
                              to={sub.href}
                              className={`menu-dropdown-item ${isActive(sub.href) ? 'menu-dropdown-item-active' : 'menu-dropdown-item-inactive'}`}
                            >
                              <span className={`inline-flex h-4 w-4 items-center justify-center rounded-full ${isActive(sub.href) ? 'bg-brand-500 text-white' : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
                                <svg width="6" height="6" viewBox="0 0 8 8" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                  <circle cx="4" cy="4" r="3" />
                                </svg>
                              </span>
                              <span>{sub.name}</span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : (
                      <Link
                        to={item.href}
                        className={`menu-item group ${active ? 'menu-item-active' : 'menu-item-inactive'}`}
                      >
                        <span className={active ? 'menu-item-icon-active' : 'menu-item-icon-inactive'}>
                          {item.icon}
                        </span>
                        <span className={`menu-item-text ${sidebarToggle ? 'lg:hidden' : ''}`}>
                          {item.name}
                        </span>
                      </Link>
                    )}
                  </li>
                );
              })}

            </ul>
          </div>

        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
