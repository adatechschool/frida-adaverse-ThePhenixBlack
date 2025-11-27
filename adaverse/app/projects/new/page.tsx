import Link from "next/link";
import { db } from "@/db";
import { promotions, student_projects } from "@/db/schema";
import { slugify } from "@/lib/slugify";
import { revalidatePath } from "next/cache";

// SERVER ACTION : création projet
async function createProject(formData: FormData) {
  "use server";

  const title = formData.get("title") as string;
  const description = formData.get("description") as string;
  const stacks = formData.get("stacks") as string;     // ← AJOUT ICI
  const promotionId = Number(formData.get("promotionId"));

  const slug = slugify(title);

  await db.insert(student_projects).values({
    title,
    slug,
    stacks,                // ← AJOUT ICI
    publishedAt: new Date(),
    promotionId,
  });

  revalidatePath("/");
  return { success: true };
}

export default async function NewProjectPage() {
  // Récupération des promotions existantes
  const promoList = await db
    .select({
      id: promotions.id,
      name: promotions.name,
    })
    .from(promotions);

  return (
    <section className="space-y-6">
      <header className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Proposer un projet</h1>

        <Link
          href="/"
          className="text-sm rounded-lg border px-3 py-1 hover:bg-neutral-50"
        >
          ← Retour
        </Link>
      </header>

      <form action={createProject} className="space-y-4 border p-4 rounded-lg bg-white">
        {/* Titre */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Titre du projet</label>
          <input
            type="text"
            name="title"
            className="w-full border px-3 py-2 rounded-lg text-sm"
            placeholder="Ex: Adaverse Platform"
            required
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Description</label>
          <textarea
            name="description"
            className="w-full border px-3 py-2 rounded-lg text-sm"
            placeholder="Décris brièvement le projet"
            rows={4}
            required
          />
        </div>

        <div className="space-y-1">
  <label className="text-sm font-medium">Stacks utilisées</label>
  <input
    type="text"
    name="stacks"
    className="w-full border px-3 py-2 rounded-lg text-sm"
    placeholder="Ex: Next.js, React, Tailwind, PostgreSQL"
    required
  />
</div>

        {/* Sélection de la promotion */}
        <div className="space-y-1">
          <label className="text-sm font-medium">Promotion</label>
          <select
            name="promotionId"
            className="w-full border px-3 py-2 rounded-lg text-sm bg-white"
            required
          >
            <option value="">Choisir une promotion</option>

            {promoList.map((promo) => (
              <option key={promo.id} value={promo.id}>
                {promo.name}
              </option>
            ))}
          </select>
        </div>

        {/* Bouton */}
        <button
          type="submit"
          className="rounded-lg border px-4 py-2 text-sm bg-black text-white"
        >
          Envoyer
        </button>
      </form>
    </section>
  );
}