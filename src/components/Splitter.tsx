import { Allotment, AllotmentHandle } from 'allotment';
import { ComponentPropsWithoutRef, forwardRef, ForwardRefExoticComponent } from 'react';
import { cn } from '@/utils';
import 'allotment/dist/style.css';

type Props = ComponentPropsWithoutRef<typeof Allotment>;

const DEFAULT_SPLITTER_MIN_SIZE = 200;

export interface SplitterComponent
  extends ForwardRefExoticComponent<Props & React.RefAttributes<AllotmentHandle>> {
  Pane: typeof Allotment.Pane;
}

const Splitter = forwardRef<AllotmentHandle, Props>(({ className, ...delegated }, ref) => {
  return (
    <Allotment
      className={cn(
        '[--focus-border:--splitter-hover-color] [--separator-border:rgb(var(--editor-border-color))] [--sash-hover-size:2px]',
        className
      )}
      ref={ref}
      minSize={DEFAULT_SPLITTER_MIN_SIZE}
      {...delegated}
    />
  );
}) as SplitterComponent;

Splitter.Pane = Allotment.Pane;

export default Splitter;
