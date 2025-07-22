# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15 personal portfolio and blog website that combines a developer portfolio with a technical blog. It uses a file-based content management system with markdown files and deploys automatically to GitHub Pages.

## Development Commands

```bash
# Development server with Turbopack
npm run dev

# Production build (generates static files in /out/)
npm run build

# Linting
npm run lint

# Start production server (for local testing)
npm start
```

## Architecture & Key Concepts

### Dual-Branch Workflow
- **`main` branch**: Code changes, features, bug fixes, design updates
- **`posts` branch**: Blog content management only
- Both branches auto-deploy via GitHub Actions

### Content Management System
- Blog posts stored as markdown files in `posts/category/YYYY-MM/filename.md`
- Categories automatically derived from folder structure
- Frontmatter required: `title`, `date`, `excerpt`
- Optional: `tags`, `thumbnail`
- URLs generated as `/blog/category/YYYY-MM/filename`

### Tech Stack
- **Next.js 15.4.2** with App Router and static export
- **React 19** with TypeScript 5
- **Tailwind CSS 4** for styling
- **Markdown processing**: gray-matter, remark, rehype, prism.js
- **Deployment**: GitHub Actions → GitHub Pages

### Key Directories
- `src/app/` - Next.js App Router pages and layouts
- `src/components/` - Reusable React components
- `src/lib/` - Utility functions (posts.ts, markdown.ts)
- `posts/` - Blog content organized by category/date
- `public/` - Static assets including images
- `out/` - Generated static files (build output)

### Critical File Naming Rules
- **Folder names**: English only, lowercase/kebab-case (e.g., `react`, `javascript`, `data-science`)
- **File names**: English only, kebab-case with .md extension (e.g., `react-hooks-pattern.md`)
- **Avoid Korean characters** in paths - causes GitHub Pages 404 errors

## Development Workflow

### For Code Changes
1. Work on `main` branch
2. Run `npm run lint` before committing
3. Test with `npm run build` to ensure static export works
4. Push triggers auto-deployment

### For Blog Posts
1. Switch to `posts` branch: `git checkout posts`
2. Create post in `posts/category/YYYY-MM/filename.md`
3. Include required frontmatter
4. Commit and push to `posts` branch
5. Auto-deploys via GitHub Actions

### Portfolio Data
- Portfolio information stored in `src/app/portfolio/data.json`
- Includes projects, skills, certifications, achievements
- Modify this file to update portfolio content
- **Project files**: Store detailed project documentation in `projects/` directory
- **Project file naming**: Use lowercase letters with hyphens only (e.g., `used-price-calc.md`, `my-awesome-project.md`)

## Important Configuration

### Static Export Setup
- `next.config.ts` configures static export for GitHub Pages
- `output: 'export'` generates static files in `/out/`
- `trailingSlash: true` for GitHub Pages compatibility

### Deployment
- GitHub Actions workflow in `.github/workflows/deploy.yml`
- Triggers on pushes to `main` or `posts` branches
- Node.js 18, runs `npm ci` → `npm run build` → deploys `/out/`

### Styling System
- Tailwind CSS 4 with custom design tokens in `src/app/globals.css`
- Glassmorphism effects with backdrop blur
- Inter font for UI, JetBrains Mono for code
- Responsive design with mobile-first approach

## Content Guidelines

### Blog Post Structure
```markdown
---
title: "Post Title"
date: "2025-07-22"
excerpt: "Brief description shown in post listings"
tags: ["React", "TypeScript", "Performance"]
thumbnail: "/images/post-image.png"  # optional
---

# Post Title

Content in markdown...
```

### Image Management
- Store images in `public/images/`
- Reference as `/images/filename.png` in markdown
- Optimize images before adding to repository