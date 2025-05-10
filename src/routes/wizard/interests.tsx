import { InterestsStep } from '@/modules/form/wizard/steps/InterestsStep';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/wizard/interests')({
  component: InterestsStep,
});
