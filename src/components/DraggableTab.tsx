import { WizardOption } from '@/modules/form/wizard/options';
import { Link, useLocation } from '@tanstack/react-router';
import { Button } from './ui/button';

type Props = {
  route: WizardOption;
};

export const DraggableTab = ({ route }: Props) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(route.path);

  return (
    <Link to={route.path} className="block flex items-center">
      <Button variant={isActive ? 'default' : 'ghost'} className="w-full justify-start px-3 text-sm font-medium">
        <span className="mr-2">{route.icon}</span>
        {route.label}
      </Button>
    </Link>
  );
};
