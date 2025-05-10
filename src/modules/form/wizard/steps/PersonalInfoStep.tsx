import { StepNavigator } from '@/components/StepNavigator';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { emailRegex, githubRegex, linkedinRegex } from '@/lib/constants';
import { cn } from '@/lib/utils';
import { useFormContext } from 'react-hook-form';

export const PersonalInfoStep = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="flex flex-col gap-6">
      <div>
        <Label>Full Name</Label>
        <Input
          type="text"
          {...register('fullName', {
            required: true,
            validate: (value) => value.trim() !== '',
          })}
          className={cn(Boolean(errors?.fullName) && 'border-red-500')}
        />
      </div>
      <div>
        <Label>Position</Label>
        <Input type="text" {...register('position')} />
      </div>
      <div>
        <Label>E-mail</Label>
        <Input
          type="text"
          {...register('email', {
            validate: (value) => {
              if (value === '') return true;
              return emailRegex.test(value);
            },
          })}
          className={cn('border', Boolean(errors?.email) && 'border-red-500')}
        />
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
        <Input
          type="text"
          {...register('linkedin', {
            validate: (value) => {
              if (value === '') return true;
              return linkedinRegex.test(value);
            },
          })}
          className={cn('border', Boolean(errors?.linkedin) && 'border-red-500')}
        />
      </div>
      <div>
        <Label>GitHub</Label>
        <Input
          type="text"
          {...register('github', {
            validate: (value) => {
              if (value === '') return true;
              return githubRegex.test(value);
            },
          })}
          className={cn('border', Boolean(errors?.github) && 'border-red-500')}
        />
      </div>
      <StepNavigator toNext="/wizard/summary" />
    </div>
  );
};
