'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronRight, ChevronDown, Folder, FolderOpen, FileText, X } from 'lucide-react';
import { NavigationTree, FileDetails } from '@/lib/markdown';

interface LeftSidebarProps {
  treeData: NavigationTree;
  activeUrl: string;
  onClose: () => void;
}

function TreeNode({ label, icon, isOpen, onClick, children, isFile = false, isActive = false }: any) {
  return (
    <div className="flex flex-col">
      <div
        className={`flex items-center gap-2 px-2 py-1.5 cursor-pointer rounded-md hover:bg-slate-100 ${
          isActive ? 'bg-indigo-50 text-indigo-700 font-medium' : 'text-slate-700'
        }`}
        onClick={onClick}
      >
        {!isFile && (
          <span className="text-slate-400">
            {isOpen ? <ChevronDown size={16} /> : <ChevronRight size={16} />}
          </span>
        )}
        {isFile && <span className="w-4" />} {/* Spacer for files to align with folders */}
        <span className={isActive ? 'text-indigo-600' : 'text-slate-500'}>{icon}</span>
        <span className="truncate text-sm">{label}</span>
      </div>
      {isOpen && <div className="ml-4 pl-2 border-l border-slate-200">{children}</div>}
    </div>
  );
}

export default function LeftSidebar({ treeData, activeUrl, onClose }: LeftSidebarProps) {
  // Simple state to keep track of expanded folders.
  // In a real app, you might want to auto-expand to the active URL.
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const toggleExpand = (id: string) => {
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between p-4 border-b border-slate-200">
        <h2 className="text-lg font-semibold text-slate-800">Contents</h2>
        <button onClick={onClose} className="md:hidden p-1 text-slate-500 hover:bg-slate-100 rounded">
          <X size={20} />
        </button>
      </div>
      <div className="flex-1 overflow-y-auto p-2">
        {Object.entries(treeData).map(([sectionName, subjects]) => (
          <TreeNode
            key={sectionName}
            label={sectionName}
            isOpen={expanded[sectionName]}
            onClick={() => toggleExpand(sectionName)}
            icon={expanded[sectionName] ? <FolderOpen size={16} /> : <Folder size={16} />}
          >
            {Object.entries(subjects).map(([subjectName, topics]) => {
              const subjectId = `${sectionName}-${subjectName}`;
              return (
                <TreeNode
                  key={subjectId}
                  label={subjectName}
                  isOpen={expanded[subjectId]}
                  onClick={() => toggleExpand(subjectId)}
                  icon={expanded[subjectId] ? <FolderOpen size={16} /> : <Folder size={16} />}
                >
                  {Object.entries(topics).map(([topicName, files]) => {
                    const topicId = `${subjectId}-${topicName}`;
                    return (
                      <TreeNode
                        key={topicId}
                        label={topicName}
                        isOpen={expanded[topicId]}
                        onClick={() => toggleExpand(topicId)}
                        icon={expanded[topicId] ? <FolderOpen size={16} /> : <Folder size={16} />}
                      >
                        {files.map((file) => (
                          <Link href={file.url} key={file.url} onClick={onClose}>
                            <TreeNode
                              label={file.subtopic || file.title}
                              isFile={true}
                              isActive={activeUrl === file.url}
                              icon={<FileText size={16} />}
                            />
                          </Link>
                        ))}
                      </TreeNode>
                    );
                  })}
                </TreeNode>
              );
            })}
          </TreeNode>
        ))}
      </div>
    </div>
  );
}
