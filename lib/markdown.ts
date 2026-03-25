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

  return {
    frontmatter: data as Frontmatter,
    content,
    slug,
    url: `/${slug.join('/')}`
  };
}
