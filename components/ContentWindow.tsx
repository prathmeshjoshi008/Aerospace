'use client';

import { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import { Frontmatter } from '@/lib/markdown';
import { Clipboard } from 'lucide-react';

import Link from 'next/link';
import { Info } from 'lucide-react';

interface TopicNav {
  title: string;
  url: string;
}

interface ContentWindowProps {
  content: string;
  frontmatter: Frontmatter;
  previousTopic?: TopicNav | null;
  nextTopic?: TopicNav | null;
}

// Helper to convert ALL CAPS or dash-separated strings to Title Case
function toTitleCase(str: string) {
  if (!str) return '';
  // Replace dashes with spaces and title case each word
  return str.replace(/-/g, ' ').replace(
    /\w\S*/g,
    (txt) => txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
  );
}

export default function ContentWindow({ content, frontmatter, previousTopic, nextTopic }: ContentWindowProps) {
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
        <div className="flex flex-wrap items-center gap-2 text-sm font-medium mb-4">
          <a href="#" className="text-[#3b82f6] hover:underline transition-all">
            {toTitleCase(frontmatter.section)}
          </a>
          <span className="text-[#9ca3af]">›</span>
          <a href="#" className="text-[#3b82f6] hover:underline transition-all">
            {toTitleCase(frontmatter.subject)}
          </a>
          <span className="text-[#9ca3af]">›</span>
          <a href="#" className="text-[#3b82f6] hover:underline transition-all">
            {toTitleCase(frontmatter.topic)}
          </a>
          <span className="text-[#9ca3af]">›</span>
          <span className="text-[#374151]">
            {frontmatter.title}
          </span>
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-slate-900 mb-4">
          {frontmatter.title}
        </h1>
        {frontmatter.difficulty && (
          <div className="flex items-center gap-2">
            <div className="group relative flex items-center">
              <span className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-semibold cursor-help ${
                frontmatter.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                frontmatter.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                'bg-red-100 text-red-800'
              }`}>
                {frontmatter.difficulty}
                <Info size={12} className="opacity-70" />
              </span>

              {/* Tooltip */}
              <div className="absolute left-0 bottom-full mb-2 hidden group-hover:block w-max max-w-[200px] z-[100]">
                <div className="bg-[#1f2937] text-white text-xs rounded py-1.5 px-2.5 shadow-lg relative">
                  <span className="font-bold">{frontmatter.difficulty}:</span> Requires understanding of prerequisite concepts. Commonly appears in GATE.
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-4 -mt-px border-4 border-transparent border-t-[#1f2937]" />
                </div>
              </div>
            </div>
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

      {/* Previous / Next Topic Navigation */}
      {(previousTopic || nextTopic) && (
        <nav className="flex flex-row justify-between items-center border-t border-slate-200 pt-6 mt-8">
          {previousTopic ? (
            <Link
              href={previousTopic.url}
              className="text-[#2563eb] font-medium hover:underline flex items-center gap-1"
            >
              <span>←</span>
              <span>{previousTopic.title}</span>
            </Link>
          ) : <div />}

          {nextTopic ? (
            <Link
              href={nextTopic.url}
              className="text-[#2563eb] font-medium hover:underline flex items-center gap-1 text-right"
            >
              <span>{nextTopic.title}</span>
              <span>→</span>
            </Link>
          ) : <div />}
        </nav>
      )}
    </article>
  );
}