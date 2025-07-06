import { StepNavigator } from '@/components/StepNavigator';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { YearMonthPicker } from '@/components/YearMonthPicker';
import { cn, isValidRangeDate } from '@/lib/utils';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { Education } from '../../FormContext';
import { DragDropStepWrapper } from '../../DragDropStepWrapper';
import React from 'react';

export const EducationStep = () => {
  const {
    register,
    control,
    formState: { errors },
    trigger,
  } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'education',
  });

  const educationHidden = useWatch({ name: 'educationHidden' });
  const education = useWatch({ control, name: 'education' });

  const handleAddEducation = () => {
    append({ institution: '', from: '', isCurrent: false, to: '' });
  };

  const isEducationValid = education.every((educ: Education) => {
    const { institution, from, to, isCurrent } = educ;
    return institution.trim() !== '' && from && (isCurrent || (to && isValidRangeDate(from, to)));
  });

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-baseline justify-between">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Education</h2>
        <div className="flex items-center gap-2">
          <Controller
            name="educationHidden"
            control={control}
            render={({ field }) => (
              <Label htmlFor="hide-education" className="flex items-center gap-2 text-sm">
                <Checkbox id="hide-education" checked={field.value} onCheckedChange={field.onChange} />
                Hide
              </Label>
            )}
          />
        </div>
      </div>
      {!educationHidden && (
        <>
          <div>
            <Label>Heading</Label>
            <Input type="text" {...register('educationHeading')} />
          </div>
          <DragDropStepWrapper
            droppableId="education"
            fields={fields}
            move={move}
            onRemove={remove}
            renderItem={(field, index) => (
              <React.Fragment key={field.id}>
                <div>
                  <Label>Institution</Label>
                  <Input
                    {...register(`education.${index}.institution`, {
                      validate: (value) => value.trim() !== '',
                    })}
                    placeholder="University of Acme"
                    className={cn('border', Boolean((errors?.education as any)?.[index]?.institution) && 'border-red-500')}
                  />
                </div>

                <div>
                  <Label>From</Label>
                  <Controller
                    control={control}
                    name={`education.${index}.from`}
                    rules={{ required: true }}
                    render={({ field }) => (
                      <YearMonthPicker
                        value={field.value}
                        label="Start date"
                        onChange={(date) => {
                          field.onChange(date);
                          trigger(`education.${index}.from`);
                        }}
                      />
                    )}
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Controller
                    name={`education.${index}.isCurrent`}
                    control={control}
                    render={({ field }) => (
                      <Label htmlFor={`is-current-${index}`} className="flex items-center gap-2 text-sm">
                        <Checkbox id={`is-current-${index}`} checked={field.value} onCheckedChange={field.onChange} />I am currently
                        attending this institution
                      </Label>
                    )}
                  />
                </div>
                {!education?.[index]?.isCurrent && (
                  <div>
                    <Label>To</Label>
                    <Controller
                      control={control}
                      name={`education.${index}.to`}
                      rules={{
                        validate: (value) => {
                          const isCurrent = education?.[index]?.isCurrent;
                          const fromDate = education?.[index]?.from;
                          if ((!isCurrent && !value) || (fromDate && value && !isValidRangeDate(fromDate, value))) {
                            return false;
                          }
                          return true;
                        },
                      }}
                      render={({ field }) => {
                        const isError = education?.[index]?.isCurrent === false && !field.value;
                        const isValidRange = education?.[index]?.from && isValidRangeDate(education?.[index]?.from, field.value);
                        return (
                          <div>
                            <YearMonthPicker value={field.value} label="End date" onChange={field.onChange} />
                            {isError && (
                              <p className="text-red-500 text-sm">End date is required if not currently attending this institution</p>
                            )}
                            {education?.[index]?.from && !isValidRange && field.value && (
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
            <Button type="button" onClick={handleAddEducation} disabled={!isEducationValid}>
              + Add Education
            </Button>
          </div>
        </>
      )}
      <StepNavigator />
    </div>
  );
};
