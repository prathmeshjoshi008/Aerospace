'use client';

import { Menu, PanelRightClose, PanelRightOpen, Download, BookmarkPlus, Star, HelpCircle, ArrowRightLeft, PenSquare } from 'lucide-react';

interface TopBarProps {
  onToggleLeft: () => void;
  onToggleRight: () => void;
}

export default function TopBar({ onToggleLeft, onToggleRight }: TopBarProps) {
  return (
    <header className="sticky top-0 z-20 flex h-16 shrink-0 items-center gap-x-4 border-b border-slate-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
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
        <div className="flex items-center space-x-2 md:space-x-4 overflow-x-auto pb-1 md:pb-0 scrollbar-hide">
          <ToolButton icon={<Download size={18} />} label="PDF" />
          <ToolButton icon={<BookmarkPlus size={18} />} label="Revise" />
          <ToolButton icon={<Star size={18} />} label="Rate" />
          <ToolButton icon={<HelpCircle size={18} />} label="PYQ" />
          <ToolButton icon={<ArrowRightLeft size={18} />} label="Leave" />
          <ToolButton icon={<PenSquare size={18} />} label="Prompt" />
        </div>

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <button
            type="button"
            className="-m-2.5 p-2.5 text-slate-700 hover:text-indigo-600 hover:bg-slate-100 rounded-md transition-colors"
            onClick={onToggleRight}
            title="Toggle Formulas"
          >
            <span className="sr-only">Toggle formulas panel</span>
            <PanelRightOpen className="h-6 w-6 md:hidden" aria-hidden="true" />
            <span className="hidden md:flex items-center gap-2 text-sm font-medium">
              <PanelRightOpen className="h-5 w-5" />
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
    <button className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium text-slate-600 hover:text-indigo-600 hover:bg-indigo-50 rounded-md border border-transparent hover:border-indigo-100 transition-all whitespace-nowrap">
      {icon}
      <span className="hidden md:inline-block">{label}</span>
    </button>
  );
}