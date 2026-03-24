'use client';

import { Formula } from '@/lib/markdown';
import { X } from 'lucide-react';

interface RightSidebarProps {
  formulas: Formula[];
  onClose: () => void;
}

export default function RightSidebar({ formulas, onClose }: RightSidebarProps) {
  return (
    <div className="flex h-full flex-col bg-slate-50 border-l border-slate-200 shadow-sm">
      <div className="flex items-center justify-between p-4 border-b border-slate-200 bg-white sticky top-0 z-10">
        <h2 className="text-lg font-semibold text-slate-800">Formulas</h2>
        <button onClick={onClose} className="md:hidden p-1 text-slate-500 hover:bg-slate-100 rounded transition-colors">
          <X size={20} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {formulas.length === 0 ? (
          <div className="text-center text-slate-500 py-8">
            <p className="text-sm">No formulas defined for this topic.</p>
          </div>
        ) : (
          formulas.map((formula, index) => (
            <div
              key={index}
              className="bg-white rounded-lg border border-slate-200 p-4 shadow-sm hover:shadow-md transition-shadow"
            >
              <h3 className="text-sm font-semibold text-indigo-700 mb-2">{formula.name}</h3>

              <div className="bg-slate-50 p-3 rounded-md mb-3 flex items-center justify-center overflow-x-auto">
                <span dangerouslySetInnerHTML={{ __html: renderLatex(formula.latex) }} />
              </div>

              {formula.description && (
                <div className="mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Description</span>
                  <p className="text-sm text-slate-700 leading-relaxed">{formula.description}</p>
                </div>
              )}

              {formula.usage && (
                <div className="mb-2">
                  <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block mb-1">Usage</span>
                  <p className="text-sm text-slate-700 leading-relaxed italic">{formula.usage}</p>
                </div>
              )}

              {formula.mnemonic && (
                <div className="mt-3 pt-3 border-t border-slate-100">
                  <span className="text-xs font-semibold text-amber-600 uppercase tracking-wider block mb-1">💡 Mnemonic</span>
                  <p className="text-sm text-slate-700 font-medium">{formula.mnemonic}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

import katex from 'katex';

// A simple client-side helper to render LaTeX string as HTML
// In a real production app, we should use katex.renderToString during SSG
// But for this sidebar component receiving plain strings, this is a practical approach.
function renderLatex(latexString: string) {
  // Basic KaTeX render for the string, not perfect but sufficient for plain formulas
  // The markdown file might include $ ... $ wrappers which KaTeX string renderer doesn't strictly need
  // or it might fail if we strip them blindly. Let's just try to pass the string and let KaTeX handle
  // its own errors if any.
  let cleanLatex = latexString.trim();
  let isDisplayMode = false;

  if (cleanLatex.startsWith('$$')) {
      cleanLatex = cleanLatex.replace(/^\$\$|\$\$$/g, '');
      isDisplayMode = true;
  } else if (cleanLatex.startsWith('$')) {
      cleanLatex = cleanLatex.replace(/^\$|\$$/g, '');
  }

  try {
    return katex.renderToString(cleanLatex, {
      throwOnError: false,
      displayMode: isDisplayMode,
    });
  } catch (error) {
    console.error("KaTeX Error:", error);
    return `<span class="math math-inline">${latexString}</span>`;
  }
}