import { StepNavigator } from '@/components/StepNavigator';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { YearMonthPicker } from '@/components/YearMonthPicker';
import { cn, isValidRangeDate } from '@/lib/utils';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Experience } from '../../FormContext';
import { DragDropStepWrapper } from '../../DragDropStepWrapper';
import React from 'react';

export const ExperienceStep = () => {
  const {
    register,
    control,
    formState: { errors },
    trigger,
  } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'experience',
  });

  const experienceHidden = useWatch({ name: 'experienceHidden' });
  const experience = useWatch({ control, name: 'experience' });

  const handleAddExperience = () => {
    append({ title: '', company: '', from: '', isCurrent: false, to: '' });
  };

  const isExperienceValid = experience.every((exp: Experience) => {
    const { title, from, to, isCurrent } = exp;
    return title.trim() !== '' && from && (isCurrent || (to && isValidRangeDate(from, to)));
  });

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-baseline justify-between">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Experience</h2>
        <div className="flex items-center gap-2">
          <Controller
            name="experienceHidden"
            control={control}
            render={({ field }) => (
              <Label htmlFor="hide-experience" className="flex items-center gap-2 text-sm">
                <Checkbox id="hide-experience" checked={field.value} onCheckedChange={field.onChange} />
                Hide
              </Label>
            )}
          />
        </div>
      </div>
      {!experienceHidden && (
        <>
          <div>
            <Label>Heading</Label>
            <Input type="text" {...register('experienceHeading')} />
          </div>
          <DragDropStepWrapper
            droppableId="experience"
            fields={fields}
            move={move}
            onRemove={remove}
            renderItem={(field, index) => (
              <React.Fragment key={field.id}>
                <div>
                  <Label>Job Title</Label>
                  <Input
                    {...register(`experience.${index}.title`, {
                      validate: (value) => value.trim() !== '',
                    })}
                    placeholder="Software Developer"
                    className={cn('border', Boolean((errors?.experience as any)?.[index]?.title) && 'border-red-500')}
                  />
                </div>

                <div>
                  <Label>Company</Label>
                  <Input {...register(`experience.${index}.company`)} placeholder="Acme" />
                </div>

                <div>
                  <Label>From</Label>
                  <Controller
                    control={control}
                    name={`experience.${index}.from`}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <YearMonthPicker
                        value={field.value}
                        label="Start date"
                        onChange={(date) => {
                          field.onChange(date);
                          trigger(`experience.${index}.from`);
                        }}
                      />
                    )}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Controller
                    name={`experience.${index}.isCurrent`}
                    control={control}
                    render={({ field }) => (
                      <Label htmlFor={`is-current-${index}`} className="flex items-center gap-2 text-sm">
                        <Checkbox id={`is-current-${index}`} checked={field.value} onCheckedChange={field.onChange} />I am currently working
                        in this role
                      </Label>
                    )}
                  />
                </div>
                {!experience?.[index]?.isCurrent && (
                  <div>
                    <Label>To</Label>
                    <Controller
                      control={control}
                      name={`experience.${index}.to`}
                      rules={{
                        validate: (value) => {
                          const isCurrent = experience?.[index]?.isCurrent;
                          const fromDate = experience?.[index]?.from;
                          if ((!isCurrent && !value) || (fromDate && value && !isValidRangeDate(fromDate, value))) {
                            return false;
                          }
                          return true;
                        },
                      }}
                      render={({ field }) => {
                        const isError = experience?.[index]?.isCurrent === false && !field.value;
                        const isValidRange = experience?.[index]?.from && isValidRangeDate(experience?.[index]?.from, field.value);
                        return (
                          <div>
                            <YearMonthPicker value={field.value} label="End date" onChange={field.onChange} />
                            {isError && <p className="text-red-500 text-sm">End date is required if not currently working</p>}
                            {experience?.[index]?.from && !isValidRange && field.value && (
                              <p className="text-red-500 text-sm">End date must be after start date</p>
                            )}
                          </div>
                        );
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            )}
          />
          <div className="flex justify-end">
            <Button type="button" onClick={handleAddExperience} disabled={!isExperienceValid}>
              + Add Experience
            </Button>
          </div>
        </>
      )}
      <StepNavigator />
    </div>
  );
};
