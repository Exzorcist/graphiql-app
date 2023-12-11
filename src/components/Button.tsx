import { ComponentProps } from 'react';
import { cn } from '@/utils';

type Props = ComponentProps<'button'>;

function Button({ className, children, ...delegated }: Props) {
  return (
    <button className={cn(className)} type="button" {...delegated}>
      {children}
    </button>
  );
}

export default Button;
