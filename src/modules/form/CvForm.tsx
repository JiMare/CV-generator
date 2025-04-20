import { RouterProvider, createRouter } from '@tanstack/react-router';
import { routeTree } from '@/routeTree.gen.ts';
import { Card } from '@/components/ui/card';

export const CvForm = () => {
  const router = createRouter({ routeTree });
  return (
    <Card className="w-full lg:w-1/2 shadow-md border-0 p-4">
      <form>
        <RouterProvider router={router} />
      </form>
    </Card>
  );
};
