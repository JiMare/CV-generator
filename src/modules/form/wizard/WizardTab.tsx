import { Outlet, useRouterState } from '@tanstack/react-router';
import { wizardOptions } from './options';
import { DraggableTab } from '@/components/DraggableTab';
import { DragDropContext, Draggable, Droppable, DropResult } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';
import { useWizardContext } from './WizardContext';
import { Loader2 } from 'lucide-react';

export const WizardTab = () => {
  const { status } = useRouterState();
  const isPending = status === 'pending';
  const { draggableOptions, setDraggableOptions } = useWizardContext();

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;

    const updatedOptions = Array.from(draggableOptions);
    const [movedOption] = updatedOptions.splice(source.index, 1);
    updatedOptions.splice(destination.index, 0, movedOption);
    setDraggableOptions(updatedOptions);
  };

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
        {isPending ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="h-6 w-6 animate-spin text-primary" />
          </div>
        ) : (
          <Outlet />
        )}
      </div>
    </div>
  );
};
