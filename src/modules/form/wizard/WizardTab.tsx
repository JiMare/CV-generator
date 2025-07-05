import { Outlet } from '@tanstack/react-router';
import { WizardOption, wizardOptions } from './options';
import { DraggableTab } from '@/components/DraggableTab';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { useEffect, useState } from 'react';
import { GripVertical } from 'lucide-react';

export const WizardTab = () => {
  const [draggableOptions, setDraggableOptions] = useState<WizardOption[]>(
    localStorage.getItem('draggableWizardTabs')
      ? JSON.parse(localStorage.getItem('draggableWizardTabs')!)
      : wizardOptions.filter((option) => option.draggable)
  );

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;

    const updatedOptions = Array.from(draggableOptions);
    const [movedOption] = updatedOptions.splice(source.index, 1);
    updatedOptions.splice(destination.index, 0, movedOption);
    setDraggableOptions(updatedOptions);
  };

  useEffect(() => {
    localStorage.setItem('draggableWizardTabs', JSON.stringify(draggableOptions));
  }, [draggableOptions]);

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <nav className="md:w-64 md:pr-4 space-y-2">
        {wizardOptions
          .filter((option) => !option.draggable)
          .map((option) => (
            <DraggableTab key={option.label} route={option} />
          ))}
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="wizard-tabs">
            {(provided) => (
              <div {...provided.droppableProps} ref={provided.innerRef} className="space-y-2">
                {draggableOptions.map((option, index) => {
                  return (
                    <Draggable key={option.label} draggableId={option.label} index={index}>
                      {(provided) => (
                        <div ref={provided.innerRef} {...provided.draggableProps}>
                          <DraggableTab
                            route={option}
                            dragElement={
                              <div className="absolute top-3 right-3 cursor-move" {...provided.dragHandleProps}>
                                <GripVertical className="h-4 w-4 cursor-grab text-muted-foreground" />
                              </div>
                            }
                          />
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
      </nav>
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};
