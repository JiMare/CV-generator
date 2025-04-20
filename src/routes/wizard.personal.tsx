import { PersonalInfoStep } from '@/modules/form/wizard/steps/PersonalInfoStep';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/wizard/personal')({
  component: PersonalInfoStep,
});
