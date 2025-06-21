import { StepNavigator } from '@/components/StepNavigator';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { LanguageProficiency } from './LanguageProficiency';
import { Language } from '@/modules/form/FormContext';
import { DragDropStepWrapper } from '@/modules/form/DragDropStepWrapper';
import React from 'react';

export const LanguagesStep = () => {
  const {
    register,
    control,
    formState: { errors },
  } = useFormContext();
  const { fields, append, remove, move } = useFieldArray({
    control,
    name: 'languages',
  });

  const languagesHidden = useWatch({ name: 'languagesHidden' });
  const languages = useWatch({ control, name: 'languages' });

  console.log(languages, 'langes');

  const handleAddLanguage = () => {
    append({ name: '', level: '' });
  };

  const isLanguageValid = languages.every((lang: Language) => {
    const { name, level } = lang;
    return name.trim() !== '' && level.trim() !== '';
  });

  return (
    <div className="flex flex-col gap-6 h-full">
      <div className="flex items-baseline justify-between">
        <h2 className="scroll-m-20 text-3xl font-semibold tracking-tight first:mt-0">Languages</h2>
        <div className="flex items-center gap-2">
          <Controller
            name="languagesHidden"
            control={control}
            render={({ field }) => (
              <Label htmlFor="hide-languages" className="flex items-center gap-2 text-sm">
                <Checkbox id="hide-languages" checked={field.value} onCheckedChange={field.onChange} />
                Hide
              </Label>
            )}
          />
        </div>
      </div>
      {!languagesHidden && (
        <>
          <div>
            <Label>Heading</Label>
            <Input type="text" {...register('languagesHeading')} />
          </div>    
          <DragDropStepWrapper
            droppableId="languages"
            fields={fields}
            move={move}
            onRemove={remove}
            renderItem={(field, index) => (
              <React.Fragment key={field.id}>
                <div>
                  <Label>Language name</Label>
                  <Input
                    {...register(`languages.${index}.name`, {
                      validate: (value) => value.trim() !== '',
                    })}
                    placeholder="Enter language name"
                    className={cn('border', Boolean((errors?.languages as any)?.[index]?.name) && 'border-red-500')}
                  />
                </div>
                <div>
                  <Label>Proficiency</Label>
                  <Controller
                    control={control}
                    name={`languages.${index}.level`}
                    render={({ field }) => <LanguageProficiency field={field} />}
                  />
                </div>
              </React.Fragment>
            )}
          />
          <div className="flex justify-end">
            <Button type="button" onClick={handleAddLanguage} disabled={!isLanguageValid}>
              + Add Language
            </Button>
          </div>
        </>
      )}
      <StepNavigator toPrev="/wizard/projects" toNext="/wizard/soft-skills" />
    </div>
  );
};
