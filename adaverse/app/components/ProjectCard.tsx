// app/_components/ProjectCard.tsx
import Link from "next/link";

interface ProjectCardProps {
  id: number;
  title: string;
  slug: string | null;
  adaProjectName: string | null;
  promotionName: string | null;
  publishedAt: string | null;
}

export function ProjectCard(props: ProjectCardProps) {
  const {
    title,
    slug,
    adaProjectName,
    promotionName,
    publishedAt,
  } = props;

  const href = slug ? `/projects/${slug}` : "#";

  return (
    <li className="border rounded-lg p-3 hover:bg-neutral-50 transition">
      <Link
        href={href}
        className="block space-y-1"
        aria-disabled={!slug}
      >
        <div className="font-semibold">{title}</div>
        <div className="text-xs text-neutral-500">
          {adaProjectName ?? "Projet ADA"} · {promotionName ?? "Promotion inconnue"}
        </div>
        {publishedAt && (
          <div className="text-[11px] text-neutral-400">
            Publié le{" "}
            {new Date(publishedAt).toLocaleDateString("fr-FR")}
          </div>
        )}
      </Link>
    </li>
  );
}