'use client';

import { useState } from 'react';
import { NavigationTree, Frontmatter } from '@/lib/markdown';
import LeftSidebar from './LeftSidebar';
import RightSidebar from './RightSidebar';
import ContentWindow from './ContentWindow';
import TopBar from './TopBar';

interface ThreePaneWorkspaceProps {
  treeData: NavigationTree;
  pageData: {
    frontmatter: Frontmatter;
    content: string;
    slug: string[];
    url: string;
  };
}

export default function ThreePaneWorkspace({ treeData, pageData }: ThreePaneWorkspaceProps) {
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-slate-50 text-slate-900">
      {/* Left Sidebar (Tree Window) */}
      <div
        className={`fixed inset-y-0 left-0 z-30 w-72 transform bg-white border-r border-slate-200 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          leftSidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <LeftSidebar treeData={treeData} activeUrl={pageData.url} onClose={() => setLeftSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile left sidebar */}
      {leftSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 md:hidden"
          onClick={() => setLeftSidebarOpen(false)}
        />
      )}

      {/* Center Window */}
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <TopBar
          onToggleLeft={() => setLeftSidebarOpen(!leftSidebarOpen)}
          onToggleRight={() => setRightSidebarOpen(!rightSidebarOpen)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-8">
          <ContentWindow content={pageData.content} frontmatter={pageData.frontmatter} />
        </main>
      </div>

      {/* Right Sidebar (Formula Window) */}
      <div
        className={`fixed inset-y-0 right-0 z-30 w-80 transform bg-white border-l border-slate-200 transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${
          rightSidebarOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <RightSidebar formulas={pageData.frontmatter.formulas || []} onClose={() => setRightSidebarOpen(false)} />
      </div>

      {/* Overlay for mobile right sidebar */}
      {rightSidebarOpen && (
        <div
          className="fixed inset-0 z-20 bg-black/20 md:hidden"
          onClick={() => setRightSidebarOpen(false)}
        />
      )}
    </div>
  );
}
