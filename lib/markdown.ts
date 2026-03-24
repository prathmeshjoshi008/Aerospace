import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface Formula {
  name: string;
  latex: string;
  description?: string;
  usage?: string;
  example?: string;
  mnemonic?: string;
}

export interface Pyq {
  question: string;
  options: string[];
  answer: number;
}

export interface Frontmatter {
  title: string;
  section: string;
  subject: string;
  topic: string;
  subtopic: string;
  difficulty?: 'Easy' | 'Medium' | 'Hard';
  formulas?: Formula[];
  pyqs?: Pyq[];
}

export interface FileDetails extends Frontmatter {
  slug: string[];
  url: string;
}

// Tree structure: Section -> Subject -> Topic -> Subtopic Details
export interface NavigationTree {
  [section: string]: {
    [subject: string]: {
      [topic: string]: FileDetails[];
    };
  };
}

const contentDir = path.join(process.cwd(), 'content');

// Helper to recursively read all .md files
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

export function getNavigationTree(): NavigationTree {
  const files = getAllMarkdownFiles(contentDir);
  const tree: NavigationTree = {};

  files.forEach((filePath) => {
    const fileContent = fs.readFileSync(filePath, 'utf-8');
    const { data } = matter(fileContent);
    const frontmatter = data as Frontmatter;

    // Build the URL slug from the filePath relative to contentDir
    const relativePath = path.relative(contentDir, filePath);
    // Remove the .md extension and split by path separator
    const slug = relativePath.replace(/\.md$/, '').split(path.sep);
    const url = `/${slug.join('/')}`;

    const fileDetails: FileDetails = {
      ...frontmatter,
      slug,
      url,
    };

    const { section, subject, topic } = frontmatter;

    if (!section || !subject || !topic) return;

    if (!tree[section]) tree[section] = {};
    if (!tree[section][subject]) tree[section][subject] = {};
    if (!tree[section][subject][topic]) tree[section][subject][topic] = [];

    tree[section][subject][topic].push(fileDetails);
  });

  return tree;
}

export function getFileContent(slug: string[]) {
  const slugPath = path.join(...slug);
  const filePath = path.join(contentDir, `${slugPath}.md`);

  if (!fs.existsSync(filePath)) {
    return null;
  }

  const fileContent = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileContent);
  const frontmatter = data as Frontmatter;

  // Determine previous and next topics in the same folder
  let previousTopic = null;
  let nextTopic = null;

  const dirPath = path.dirname(filePath);
  if (fs.existsSync(dirPath)) {
    const files = fs.readdirSync(dirPath)
      .filter(f => f.endsWith('.md'))
      .sort((a, b) => a.localeCompare(b));

    const currentFilename = path.basename(filePath);
    const currentIndex = files.indexOf(currentFilename);

    if (currentIndex > 0) {
      const prevFilePath = path.join(dirPath, files[currentIndex - 1]);
      const prevContent = fs.readFileSync(prevFilePath, 'utf-8');
      const { data: prevData } = matter(prevContent);
      const prevFrontmatter = prevData as Frontmatter;
      const prevRelativePath = path.relative(contentDir, prevFilePath);
      const prevSlug = prevRelativePath.replace(/\.md$/, '').split(path.sep);
      previousTopic = {
        title: prevFrontmatter.title || files[currentIndex - 1].replace(/\.md$/, ''),
        url: `/${prevSlug.join('/')}`
      };
    }

    if (currentIndex >= 0 && currentIndex < files.length - 1) {
      const nextFilePath = path.join(dirPath, files[currentIndex + 1]);
      const nextContent = fs.readFileSync(nextFilePath, 'utf-8');
      const { data: nextData } = matter(nextContent);
      const nextFrontmatter = nextData as Frontmatter;
      const nextRelativePath = path.relative(contentDir, nextFilePath);
      const nextSlug = nextRelativePath.replace(/\.md$/, '').split(path.sep);
      nextTopic = {
        title: nextFrontmatter.title || files[currentIndex + 1].replace(/\.md$/, ''),
        url: `/${nextSlug.join('/')}`
      };
    }
  }

  return {
    frontmatter,
    content,
    slug,
    url: `/${slug.join('/')}`,
    previousTopic,
    nextTopic
  };
}
