// app/projects/[slug]/page.tsx
import { db } from "@/db";
import { student_projects, promotions, ada_projects } from "@/db/schema";
import { eq } from "drizzle-orm";
import { notFound } from "next/navigation";
import Link from "next/link";

interface ProjectPageProps {
  params: {
    slug: string;
  };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const [project] = await db
    .select({
      id: student_projects.id,
      title: student_projects.title,
      slug: student_projects.slug,
      publishedAt: student_projects.publishedAt,
      promotionName: promotions.name,
      adaProjectName: ada_projects.name,
    })
    .from(student_projects)
    .leftJoin(
      promotions,
      eq(student_projects.promotionId, promotions.id)
    )
    .leftJoin(
      ada_projects,
      eq(student_projects.adaProjectId, ada_projects.id)
    )
    .where(eq(student_projects.slug, params.slug))
    .limit(1);

  if (!project) {
    notFound();
  }

  return (
    <main className="min-h-screen p-6 space-y-6">
      <header className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">{project.title}</h1>
          <p className="text-sm text-neutral-500">
            {project.adaProjectName} · {project.promotionName}
          </p>
          {project.publishedAt && (
            <p className="text-xs text-neutral-400 mt-1">
              Publié le {new Date(project.publishedAt).toLocaleDateString("fr-FR")}
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

      <section className="border rounded-lg p-4 text-sm text-neutral-700">
        <p>
          Ici tu pourras afficher plus d&apos;infos du projet
          (description, liens, stack, etc.) quand on les aura dans la DB.
        </p>
      </section>
    </main>
  );
}