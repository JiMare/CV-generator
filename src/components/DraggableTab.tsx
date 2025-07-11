import { iconMap, WizardOption } from '@/modules/form/wizard/options';
import { Link, useLocation } from '@tanstack/react-router';
import { Button } from './ui/button';

type Props = {
  route: WizardOption;
  dragElement?: React.ReactNode;
};

export const DraggableTab = ({ route, dragElement }: Props) => {
  const location = useLocation();
  const isActive = location.pathname.startsWith(route.path);

  const IconComponent = iconMap[route.icon as keyof typeof iconMap];

  return (
    <div className='relative'>
      <Link to={route.path} className="block flex items-center">
        <Button variant={isActive ? 'default' : 'ghost'} className="w-full justify-start px-3 text-sm font-medium">
          <span className="mr-2"><IconComponent className="h-4 w-4" /></span>
          {route.label}
        </Button>
      </Link>
      {dragElement}
    </div>
  );
};
