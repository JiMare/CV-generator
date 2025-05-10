import { SoftSkillsStep } from '@/modules/form/wizard/steps/SoftSkillsStep';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/wizard/soft-skills')({
  component: SoftSkillsStep,
});
