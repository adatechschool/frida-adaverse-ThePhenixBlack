-- Remplace X par l'id du projet à publier
UPDATE student_projects
SET published_at = NOW()
WHERE id = 2;