import TextareaAutosize from 'react-textarea-autosize';
import { cn } from '@/lib/utils';

export const AutoResizeTextarea = ({ className, ...props }: React.ComponentProps<typeof TextareaAutosize>) => {
  return (
    <TextareaAutosize
      minRows={2}
      className={cn(
        'flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
        className
      )}
      {...props}
    />
  );
};
