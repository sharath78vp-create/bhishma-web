import { useState } from 'react';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';

export const DashboardLayout: FC = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(prev => !prev);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      {/* Collapsible / Responsive Sidebar */}
      <Sidebar
        collapsed={sidebarCollapsed}
        onToggle={toggleSidebar}
        mobileOpen={mobileMenuOpen}
        onCloseMobile={() => setMobileMenuOpen(false)}
      />

      {/* Dynamic Viewport Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          sidebarCollapsed ? 'md:ml-20' : 'md:ml-64'
        }`}
      >
        {/* Top Navigation Bar with Context & Mobile Menu Toggle */}
        <Header onMenuToggle={() => setMobileMenuOpen(prev => !prev)} />

        {/* Main Content Viewport */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Institutional System Footer */}
        <footer className="px-6 py-4 border-t border-slate-900 bg-slate-950/60 text-center text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>BHISHMA &bull; AI-Powered Labour Market Intelligence & Curriculum Alignment</span>
          <span className="text-[11px] text-brand-400 font-medium">
            AI Labour Market Intelligence &amp; Industry Alignment Engine
          </span>
        </footer>
      </div>
    </div>
  );
};

