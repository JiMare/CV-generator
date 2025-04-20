import { Input } from '@/components/ui/input';
import { useFormContext } from 'react-hook-form';

export const PersonalInfoStep = () => {
  const { register } = useFormContext();
  return (
    <div>
      <Input type="text" {...register('fullName')} className="w-full border border-border rounded-md px-3 py-2" />
    </div>
  );
};
