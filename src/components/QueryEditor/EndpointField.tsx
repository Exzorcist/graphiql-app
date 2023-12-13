import { ComponentProps } from 'react';
import { cn } from '@/utils';

type Props = ComponentProps<'form'>;

function EndpointField({ className, ...delegated }: Props) {
  return (
    <form
      className={cn(
        'h-[45px] flex w-full bg-editor-secondary border-editor-border border rounded focus-within:border-editor-accent',
        className
      )}
      {...delegated}
    >
      <input className="w-full h-full bg-transparent outline-none pl-4" placeholder="Enter URL" />
      <button
        type="submit"
        className="bg-editor-accent hover:bg-editor-accent-light min-w-fit px-5 rounded-r transition"
      >
        Send Request
      </button>
    </form>
  );
}

export default EndpointField;
