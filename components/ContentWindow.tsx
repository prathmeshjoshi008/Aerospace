'use client';

import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import { Frontmatter } from '@/lib/markdown';
import { Clipboard } from 'lucide-react';

interface ContentWindowProps {
  content: string;
  frontmatter: Frontmatter;
}

export default function ContentWindow({ content, frontmatter }: ContentWindowProps) {
  const articleRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // Select all KaTeX display blocks after render
    const displayBlocks = articleRef.current?.querySelectorAll('.katex-display');
    if (!displayBlocks) return;

    displayBlocks.forEach((block) => {
      // Check if button already exists to prevent duplicates on re-renders
      if (block.querySelector('.katex-copy-btn')) return;

      // Extract LaTeX string from the mathml annotation tag embedded by KaTeX
      const annotationElement = block.querySelector('annotation[encoding="application/x-tex"]');
      const latexString = annotationElement?.textContent || '';

      const btn = document.createElement('button');
      btn.className = 'katex-copy-btn';
      btn.title = 'Copy LaTeX';

      // We create a basic SVG inline since lucide-react doesn't render to raw HTML easily here
      btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-clipboard"><rect width="8" height="4" x="8" y="2" rx="1" ry="1"/><path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2"/></svg>`;

      btn.addEventListener('click', () => {
        if (latexString) {
          navigator.clipboard.writeText(latexString);

          // Brief visual feedback
          const originalHTML = btn.innerHTML;
          btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-check"><path d="M20 6 9 17l-5-5"/></svg>`;
          setTimeout(() => {
            btn.innerHTML = originalHTML;
          }, 2000);
        }
      });

      // Append to the block
      block.appendChild(btn);

      // Also ensure block has position relative for absolute positioning of the button
      if (window.getComputedStyle(block).position === 'static') {
        (block as HTMLElement).style.position = 'relative';
      }
    });
  }, [content]);

  return (
    <article
      ref={articleRef}
      className="prose prose-slate prose-lg prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-indigo-600 hover:prose-a:text-indigo-500 pb-16 w-full mx-auto md:max-w-[720px] break-words"
      style={{ padding: 'max(16px, 4vw)', lineHeight: 1.75 }}
    >
      <header className="mb-10 border-b border-slate-200 pb-8">
        <div className="flex items-center gap-2 text-sm font-medium text-slate-500 mb-4 uppercase tracking-wider">
          <span>{frontmatter.section}</span>
          <span className="text-slate-300">/</span>
          <span>{frontmatter.subject}</span>
          <span className="text-slate-300">/</span>
          <span className="text-indigo-600">{frontmatter.topic}</span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          {frontmatter.title}
        </h1>
        {frontmatter.difficulty && (
          <div className="flex items-center gap-2">
            <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
              frontmatter.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              frontmatter.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {frontmatter.difficulty}
            </span>
          </div>
        )}
      </header>

      <div className="markdown-body">
        <ReactMarkdown
          remarkPlugins={[remarkMath, remarkGfm]}
          rehypePlugins={[rehypeKatex]}
        >
          {content}
        </ReactMarkdown>
      </div>
    </article>
  );
}