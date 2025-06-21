import { StepFieldCard } from '@/components/StepFieldCard';
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd';
import { GripVertical } from 'lucide-react';

type FieldType = { id: string; [key: string]: any };

type Props<T extends FieldType> = {
  droppableId: string;
  fields: T[];
  move: (from: number, to: number) => void;
  onRemove: (index: number) => void;
  renderItem: (field: T, index: number) => React.ReactNode;
};

export const DragDropStepWrapper = <T extends FieldType>({ fields, move, droppableId, onRemove, renderItem }: Props<T>) => {
  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;
    if (!destination || source.index === destination.index) return;
    move(source.index, destination.index);
  };
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId={droppableId}>
        {(provided) => (
          <div {...provided.droppableProps} ref={provided.innerRef} className="flex flex-col gap-4 flex-grow overflow-y-auto">
            {fields.map((field, index) => {
              return (
                <Draggable key={field.id} draggableId={field.id} index={index}>
                  {(provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} className="relative">
                      <StepFieldCard
                        onRemove={() => onRemove(index)}
                        key={field.id}
                        dragElement={
                          <div className="absolute top-2 left-2 cursor-move" {...provided.dragHandleProps}>
                            <GripVertical className="cursor-grab text-muted-foreground" />
                          </div>
                        }
                      >
                        {renderItem(field, index)}
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
  );
};
