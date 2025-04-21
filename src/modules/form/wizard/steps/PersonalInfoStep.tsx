import { StepNavigator } from '@/components/StepNavigator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useFormContext } from 'react-hook-form';

export const PersonalInfoStep = () => {
  const { register } = useFormContext();
  return (
    <div className="flex flex-col gap-6">
      <div>
        <Label>Full Name</Label>
        <Input type="text" {...register('fullName')} />
      </div>
      <div>
        <Label>Position</Label>
        <Input type="text" {...register('position')} />
      </div>
      <div>
        <Label>E-mail</Label>
        <Input type="text" {...register('email')} />
      </div>
      <div>
        <Label>Phone</Label>
        <Input type="text" {...register('phone')} />
      </div>
      <div>
        <Label>Location</Label>
        <Input type="text" {...register('location')} />
      </div>
      <div>
        <Label>LinkedIn</Label>
        <Input type="text" {...register('linkedin')} />
      </div>
      <div>
        <Label>GitHub</Label>
        <Input type="text" {...register('github')} />
      </div>
      <StepNavigator toNext="/wizard/summary" />
    </div>
  );
};
