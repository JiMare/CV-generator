import { Card } from '@/components/ui/card';
import { useFormContext } from 'react-hook-form';

export const CvPreview = () => {
  const { watch } = useFormContext();
  const fullName = watch('fullName');
  return (
    <Card className="w-full md:w-1/2 shadow-md border-0 p-4">
      <p>{fullName || 'No name yet...'}</p>
    </Card>
  );
};
