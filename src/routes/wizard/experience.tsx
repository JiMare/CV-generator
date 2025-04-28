import { ExperienceStep } from '@/modules/form/wizard/steps/ExperienceStep';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/wizard/experience')({
  component: ExperienceStep,
});
