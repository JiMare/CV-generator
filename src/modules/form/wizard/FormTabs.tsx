import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from '@tanstack/react-router';

export const FormTabs = () => {
  return (
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
  );
};
