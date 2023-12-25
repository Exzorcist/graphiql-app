import { ComponentPropsWithoutRef, ElementRef, forwardRef } from 'react';
import * as SeparatorPrimitive from '@radix-ui/react-separator';
import { cn } from '@/utils/cn';

const Separator = forwardRef<
  ElementRef<typeof SeparatorPrimitive.Root>,
  ComponentPropsWithoutRef<typeof SeparatorPrimitive.Root>
>(({ className, orientation = 'horizontal', decorative = true, ...props }, ref) => (
  <SeparatorPrimitive.Root
    ref={ref}
    decorative={decorative}
    orientation={orientation}
    className={cn(
      'shrink-0 bg-editor-border',
      orientation === 'horizontal' ? 'h-[1px] w-full my-2' : 'h-full w-[1px] mx-2',
      className
    )}
    {...props}
  />
));
Separator.displayName = SeparatorPrimitive.Root.displayName;

export default Separator;
