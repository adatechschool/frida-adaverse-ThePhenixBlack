ALTER TABLE "student_projects" RENAME COLUMN "name" TO "title";--> statement-breakpoint
ALTER TABLE "promotions" ADD COLUMN "start_date" date NOT NULL;--> statement-breakpoint
ALTER TABLE "student_projects" ADD COLUMN "slug" text NOT NULL;--> statement-breakpoint
ALTER TABLE "student_projects" ADD COLUMN "github_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "student_projects" ADD COLUMN "demo_url" text NOT NULL;--> statement-breakpoint
ALTER TABLE "student_projects" ADD COLUMN "created_at" timestamp DEFAULT now() NOT NULL;--> statement-breakpoint
ALTER TABLE "student_projects" ADD COLUMN "published_at" timestamp;--> statement-breakpoint
ALTER TABLE "student_projects" ADD COLUMN "promotion_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "student_projects" ADD COLUMN "ada_project_id" integer NOT NULL;--> statement-breakpoint
ALTER TABLE "student_projects" ADD CONSTRAINT "student_projects_promotion_id_promotions_id_fk" FOREIGN KEY ("promotion_id") REFERENCES "public"."promotions"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "student_projects" ADD CONSTRAINT "student_projects_ada_project_id_ada_projects_id_fk" FOREIGN KEY ("ada_project_id") REFERENCES "public"."ada_projects"("id") ON DELETE no action ON UPDATE no action;