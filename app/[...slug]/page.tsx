import { notFound } from 'next/navigation';
import { getNavigationTree, getFileContent } from '@/lib/markdown';
import ThreePaneWorkspace from '@/components/ThreePaneWorkspace';
import path from 'path';
import fs from 'fs';

// This is required for static site generation in Next.js App Router
export async function generateStaticParams() {
  const contentDir = path.join(process.cwd(), 'content');

  // Helper to recursively read all .md files and generate slugs
  function getAllMarkdownFiles(dirPath: string, arrayOfFiles: string[] = []): string[] {
    if (!fs.existsSync(dirPath)) return arrayOfFiles;

    const files = fs.readdirSync(dirPath);

    files.forEach((file) => {
      const filePath = path.join(dirPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        arrayOfFiles = getAllMarkdownFiles(filePath, arrayOfFiles);
      } else if (file.endsWith('.md')) {
        arrayOfFiles.push(filePath);
      }
    });

    return arrayOfFiles;
  }

  const files = getAllMarkdownFiles(contentDir);

  return files.map((filePath) => {
    const relativePath = path.relative(contentDir, filePath);
    const slug = relativePath.replace(/\.md$/, '').split(path.sep);
    return { slug };
  });
}

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export default async function Page({ params }: PageProps) {
  // Wait for params in Next.js 15+
  const resolvedParams = await params;
  const { slug } = resolvedParams;

  const treeData = getNavigationTree();
  const pageData = getFileContent(slug);

  if (!pageData) {
    notFound();
  }

  return <ThreePaneWorkspace treeData={treeData} pageData={pageData} />;
}
