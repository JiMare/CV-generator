import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
  component: () => (
    <div className="space-y-4">
      <Tabs defaultValue="wizard" className="w-full">
        <TabsList className="w-full grid grid-cols-2">
          <TabsTrigger value="wizard" asChild>
            <Link to="/wizard/personal">
              <strong>CV Wizard</strong>
            </Link>
          </TabsTrigger>
          <TabsTrigger value="style" asChild>
            <Link to="/style">
              <strong>Style Editor</strong>
            </Link>
          </TabsTrigger>
        </TabsList>
      </Tabs>
      <Outlet />
      {import.meta.env.DEV && <TanStackRouterDevtools />}
    </div>
  ),
});
