import { getAllProjects, getProjectBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import MarkdownRenderer from "@/components/MarkdownRenderer";

export async function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((project) => ({
    slug: project.slug,
  }));
}

export default async function ProjectPage(props: { params: Promise<{ slug: string }> }) {
  const params = await props.params;
  const project = getProjectBySlug(params.slug);

  if (!project) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-50 relative selection:bg-indigo-500/30">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px] pointer-events-none fixed"></div>

      <Link
        href="/gallery"
        className="fixed top-6 left-6 z-50 text-neutral-400 hover:text-white bg-neutral-800/60 hover:bg-neutral-800 backdrop-blur-sm h-10 w-10 rounded-full flex items-center justify-center transition-all border border-neutral-700/50"
        aria-label="갤러리로 돌아가기"
      >
        <IconArrowLeft className="w-5 h-5" />
      </Link>

      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-12 sm:py-20 relative z-10">

        {/* Hero Section */}
        <header className="mb-8 sm:mb-16">
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <span className="text-xs sm:text-sm font-medium px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
              {project.category}
            </span>
            {project.date && (
              <span className="text-xs sm:text-sm text-neutral-500">
                {project.date}
              </span>
            )}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tight mb-4 sm:mb-6 text-balance">
            {project.title}
          </h1>
          {project.summary && (
            <p className="text-base sm:text-xl text-neutral-400 leading-relaxed max-w-2xl">
              {project.summary}
            </p>
          )}
          {project.tags && project.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-4 sm:mt-6">
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs font-medium px-2.5 py-1 bg-neutral-800 text-neutral-300 rounded-md border border-neutral-700/50"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </header>

        {/* Main Project Image (Full View) */}
        {project.thumbnail && (
          <div className="w-full relative rounded-2xl sm:rounded-3xl overflow-hidden mb-8 sm:mb-16 ring-1 ring-white/10 bg-neutral-900/50">
            <Image
              src={project.thumbnail}
              alt={project.title}
              width={1200}
              height={675}
              className="w-full h-auto block"
              priority
            />
          </div>
        )}

        {/* Markdown Content */}
        <article className="prose prose-invert prose-base sm:prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-img:rounded-xl sm:prose-img:rounded-2xl prose-img:border prose-img:border-neutral-800">
          <MarkdownRenderer content={project.content} />
        </article>
      </main>
    </div>
  );
}
