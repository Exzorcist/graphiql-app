import { ComponentProps } from 'react';
import { cn } from '@/utils';
import Button from '../Button';

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
      <Button type="submit" variant="solid" className="px-5 rounded-none rounded-r">
        Send Request
      </Button>
    </form>
  );
}

export default EndpointField;
