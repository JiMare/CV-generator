import { StyleEditorTab } from '@/modules/form/editor/StyleEditorTab';
import { createFileRoute } from '@tanstack/react-router';

export const Route = createFileRoute('/style')({
  component: StyleEditorTab,
});
