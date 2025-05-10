import { Layout } from '@/components/Layout';
import { CvForm } from '@/modules/form/CvForm';
import { FormContext } from '@/modules/form/FormContext';
import { FormTabs } from '@/modules/form/wizard/FormTabs';
import { CvPreview } from '@/modules/output/CvPreview';
import { createRootRoute, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <Layout>
      <FormContext />
      <CvPreview />
    </Layout>

    // <div className="space-y-4">
    //   <FormTabs />
    //   <Outlet />
    //   {import.meta.env.DEV && <TanStackRouterDevtools />}
    // </div>
  ),
});
