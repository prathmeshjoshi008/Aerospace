'use client';

import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import remarkGfm from 'remark-gfm';
import { Frontmatter } from '@/lib/markdown';

interface ContentWindowProps {
  content: string;
  frontmatter: Frontmatter;
}

export default function ContentWindow({ content, frontmatter }: ContentWindowProps) {
  return (
    <article className="prose prose-slate prose-lg max-w-none prose-headings:font-bold prose-headings:text-slate-900 prose-a:text-indigo-600 hover:prose-a:text-indigo-500 pb-16">
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