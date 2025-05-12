import { LanguagesStep } from '@/modules/form/wizard/steps/langauges/LanguagesStep';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/wizard/languages')({
  component: LanguagesStep,
});
