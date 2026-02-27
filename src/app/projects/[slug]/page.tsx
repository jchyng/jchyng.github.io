import { getAllProjects, getProjectBySlug } from "@/lib/markdown";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import Image from "next/image";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";

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
        className="fixed top-6 left-6 z-50 text-neutral-700 hover:text-white hover:bg-neutral-800 h-10 w-10 rounded-full flex items-center justify-center transition-all"
        aria-label="Back to gallery"
      >
        <IconArrowLeft className="w-5 h-5" />
      </Link>

      <main className="max-w-4xl mx-auto px-6 py-20 relative z-10">

        {/* Hero Section */}
        <header className="mb-16">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-sm font-medium px-3 py-1 bg-indigo-500/10 text-indigo-400 rounded-full border border-indigo-500/20">
              {project.category}
            </span>
            {project.date && (
              <span className="text-sm text-neutral-500">
                {project.date}
              </span>
            )}
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 text-balance">
            {project.title}
          </h1>
          {project.summary && (
            <p className="text-xl text-neutral-400 leading-relaxed max-w-2xl">
              {project.summary}
            </p>
          )}
        </header>

        {/* Thumbnail Image */}
        {project.thumbnail && (
          <div className="w-full aspect-[21/9] relative rounded-3xl overflow-hidden mb-16 ring-1 ring-white/10">
            <Image
              src={project.thumbnail}
              alt={project.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Markdown Content */}
        <article className="prose prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-indigo-400 hover:prose-a:text-indigo-300 prose-img:rounded-2xl prose-img:border prose-img:border-neutral-800">
          <ReactMarkdown>
            {project.content}
          </ReactMarkdown>
        </article>
      </main>
    </div>
  );
}
