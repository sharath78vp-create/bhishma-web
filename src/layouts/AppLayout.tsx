import { useState } from 'react';
import type { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from '../components/common/Sidebar';
import { TopNav } from '../components/common/TopNav';

export const AppLayout: FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col antialiased">
      {/* Collapsible / Mobile Responsive Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggle={() => setCollapsed(prev => !prev)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
      />

      {/* Main Viewport Container */}
      <div
        className={`flex-1 flex flex-col min-w-0 transition-all duration-300 ease-in-out ${
          collapsed ? 'lg:ml-20' : 'lg:ml-64'
        }`}
      >
        {/* Top Header Navigation */}
        <TopNav onMenuToggle={() => setMobileOpen(prev => !prev)} />

        {/* Content Area */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>

        {/* Institutional Footer */}
        <footer className="px-6 py-4 border-t border-slate-200 bg-white text-xs text-slate-500 flex flex-col sm:flex-row items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-slate-800">SkillBridge</span>
            <span>&bull;</span>
            <span>AI-Powered Skill Development & Labour Market Intelligence</span>
          </div>
          <div className="text-[11px] text-brand-700 font-medium">
            Next-Gen Skill Architecture &bull; Global Talent &amp; Industry Alignment
          </div>
        </footer>
      </div>
    </div>
  );
};
