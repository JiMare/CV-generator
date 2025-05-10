import { ProjectsStep } from '@/modules/form/wizard/steps/ProjectsStep';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/wizard/projects')({
  component: ProjectsStep,
});
