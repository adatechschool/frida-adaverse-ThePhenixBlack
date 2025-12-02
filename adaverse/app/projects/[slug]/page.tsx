// app/projects/[slug]/page.tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { getProjectBySlug } from "@/lib/queries";
import { Github } from "lucide-react";

interface ProjectPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ProjectPage(props: ProjectPageProps) {
  const { slug } = await props.params;

  const [project] = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen p-6 space-y-6">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <p className="text-sm text-neutral-500">
            {project.adaProjectName} · {project.promotionName}
          </p>
          {project.publishedAt && (
            <p className="text-xs text-neutral-400 mt-1">
              Publié le{" "}
              {new Date(project.publishedAt).toLocaleDateString("fr-FR")}
            </p>
          )}
        </div>

        <Link
          href="/"
          className="text-sm rounded-lg border px-3 py-1 hover:bg-neutral-50"
        >
          ← Retour à la liste
        </Link>
      </header>

      {/* Bouton GitHub */}
      {project.githubUrl && (
        <a
          href={project.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm px-3 py-2 border rounded-lg hover:bg-neutral-100 transition"
        >
          <Github className="w-4 h-4" />
          Voir le code sur GitHub
        </a>
      )}
{project.demoUrl && (
  <a
    href={project.demoUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center gap-2 text-sm px-3 py-2 border rounded-lg hover:bg-neutral-100 transition"
  >
    🔗 Voir la démo en ligne
  </a>
)}
     
      {/* Stacks */}
      <section className="border rounded-lg p-4 text-sm text-neutral-700 space-y-2">
        <h2 className="font-medium text-neutral-800">Stacks utilisées</h2>

        <div className="flex flex-wrap gap-2">
          {project.stacks
            ?.split(",")
            .map((stack) => stack.trim())
            .map((stack, i) => (
              <span
                key={i}
                className="px-2 py-1 text-xs rounded-md bg-neutral-100 border border-neutral-300"
              >
                {stack}
              </span>
            ))}
        </div>
      </section>
    </main>
  );
}