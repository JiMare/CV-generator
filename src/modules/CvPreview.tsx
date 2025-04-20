import { Card } from '@/components/ui/card';
import { useWatch } from 'react-hook-form';

export const CvPreview = () => {
  const [fullName, summary] = useWatch({ name: ['fullName', 'summary'] });
  return (
    <Card className="w-full md:w-1/2 shadow-md border-0 p-4">
      <p>{fullName}</p>
      <p>{summary}</p>
    </Card>
  );
};
