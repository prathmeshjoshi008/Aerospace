'use client';

import { Menu, PanelRightClose, PanelRightOpen, Download, BookmarkPlus, Star, HelpCircle, ArrowRightLeft, PenSquare } from 'lucide-react';

interface TopBarProps {
  onToggleLeft: () => void;
  onToggleRight: () => void;
}

export default function TopBar({ onToggleLeft, onToggleRight }: TopBarProps) {
  return (
    <header
      className="sticky top-0 z-50 flex h-16 shrink-0 items-center gap-x-4 bg-white px-4 sm:gap-x-6 sm:px-6 lg:px-8"
      style={{ boxShadow: '0 1px 4px rgba(0,0,0,0.08)' }}
    >
      {/* Mobile Menu Toggle */}
      <button
        type="button"
        className="-m-2.5 p-2.5 text-slate-700 md:hidden hover:bg-slate-100 rounded-md transition-colors"
        onClick={onToggleLeft}
      >
        <span className="sr-only">Open sidebar</span>
        <Menu className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator for mobile */}
      <div className="h-6 w-px bg-slate-200 md:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 items-center justify-between">
        <div className="flex items-center space-x-4 md:space-x-6 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
          <ToolButton icon={<Download size={20} />} label="PDF" />
          <ToolButton icon={<BookmarkPlus size={20} />} label="Revise" />
          <ToolButton icon={<Star size={20} />} label="Rate" />
          <ToolButton icon={<HelpCircle size={20} />} label="PYQ" />
          <ToolButton icon={<ArrowRightLeft size={20} />} label="Leave" />
          <ToolButton icon={<PenSquare size={20} />} label="Prompt" />
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="flex flex-col items-center justify-center p-2 text-slate-700 hover:text-indigo-600 hover:bg-slate-50 rounded-md transition-colors"
            onClick={onToggleRight}
            title="Toggle Formulas"
          >
            <span className="sr-only">Toggle formulas panel</span>
            <PanelRightOpen className="h-5 w-5 mb-1" aria-hidden="true" />
            <span className="text-center" style={{ fontSize: '10px', color: '#6b7280' }}>
              Formulas
            </span>
          </button>
        </div>
      </div>
    </header>
  );
}

function ToolButton({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <button className="flex flex-col items-center justify-center p-2 text-slate-600 hover:text-indigo-600 hover:bg-slate-50 rounded-md transition-all whitespace-nowrap">
      <div className="mb-1">{icon}</div>
      <span className="text-center font-normal" style={{ fontSize: '10px', color: '#6b7280' }}>{label}</span>
    </button>
  );
}