import { ComponentProps } from 'react';
import { cn } from '@/utils';
import Button from '../../Button';
import SendRequestButton from './SendRequestButton';

type Props = { onDocsClick?(): void } & ComponentProps<'form'>;

function EndpointField({ onDocsClick, className, ...delegated }: Props) {
  return (
    <form
      className={cn(
        'h-[45px] flex w-full bg-editor-secondary border-editor-border border rounded [&:has(input:focus)]:border-editor-accent',
        className
      )}
      {...delegated}
    >
      <div className="w-full h-full flex ">
        <input className="w-full h-full bg-transparent outline-none pl-4" placeholder="Enter URL" />
        <div className="bottom-0 right-4 h-full flex items-center pr-4 pl-4">
          <Button variant="accented" onClick={onDocsClick}>
            Docs
          </Button>
        </div>
      </div>
      <SendRequestButton />
    </form>
  );
}

export default EndpointField;
