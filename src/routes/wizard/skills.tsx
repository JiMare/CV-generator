import { SkillsStep } from '@/modules/form/wizard/steps/SkillsStep';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/wizard/skills')({
  component: SkillsStep,
});
