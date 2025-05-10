import { EducationStep } from '@/modules/form/wizard/steps/EducationStep';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/wizard/education')({
  component: EducationStep,
});
