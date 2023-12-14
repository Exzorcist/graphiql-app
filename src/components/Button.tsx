import { forwardRef } from 'react';
import { PolyRefFunction } from 'react-polymorphed';
import { cn } from '@/utils';

const polyRef = forwardRef as PolyRefFunction;

type Props = {
  variant?: keyof typeof buttonStyle.variant;
  className?: string;
};

const buttonStyle = {
  base: 'py-[5px] px-2 hover:bg-editor-secondary hover:text-editor-accent transition rounded min-w-fit cursor-pointer',
  variant: {
    accented: 'hover:bg-editor-accent/[.15]',
    active: 'bg-editor-secondary text-editor-accent',
    solid: 'bg-editor-accent hover:bg-editor-accent-light hover:text-inherit',
  },
};

const defaultElement = 'button';

const Button = polyRef<typeof defaultElement, Props>(
  ({ as: As = defaultElement, variant, className, ...props }, ref) => {
    return (
      <As
        type="button"
        role="button"
        tabIndex={0}
        ref={ref}
        className={cn(buttonStyle.base, variant && buttonStyle.variant[variant], className)}
        {...props}
      />
    );
  }
);

export default Button;
