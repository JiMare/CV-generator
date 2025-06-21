import { StepFieldCard } from '@/components/StepFieldCard';
import { StepNavigator } from '@/components/StepNavigator';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { Controller, useFieldArray, useFormContext, useWatch } from 'react-hook-form';
import { LanguageProficiency } from './LanguageProficiency';
import { Language } from '@/modules/form/FormContext';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';

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

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;
    move(source.index, destination.index);
  };

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
          <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="languages">
              {(provided) => (
                <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-4 flex-grow overflow-y-auto">
                  {fields.map((field, index) => {
                    return (
                      <Draggable key={field.id} draggableId={field.id} index={index}>
                        {(provided) => (
                          <div ref={provided.innerRef} {...provided.draggableProps} className="relative">
                            <StepFieldCard
                              onRemove={() => remove(index)}
                              key={field.id}
                              dragElement={
                                <div className="absolute top-2 left-2 cursor-move" {...provided.dragHandleProps}>
                                  <GripVertical className="cursor-grab text-muted-foreground" />
                                </div>
                              }
                            >
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
                            </StepFieldCard>
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>

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
