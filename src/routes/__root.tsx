import { Layout } from '@/components/Layout';
import { FormContext } from '@/modules/form/FormContext';
import { CvPreview } from '@/modules/output/CvPreview';
import { createRootRoute } from '@tanstack/react-router';

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <FormContext />
      <CvPreview />
    </Layout>
  ),
});
