import { Outlet } from '@tanstack/react-router';
import { Card } from '@/components/ui/card';
import { FormTabs } from './wizard/FormTabs';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const CvForm = () => {
  return (
    <Card className="w-full lg:w-1/2 shadow-md border-0 p-4">
      <form>
        <div className="space-y-4">
          <FormTabs />
          <Outlet />
          {import.meta.env.DEV && <TanStackRouterDevtools />}
        </div>
      </form>
    </Card>
  );
};
