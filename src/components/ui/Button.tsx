import { forwardRef } from 'react';
import { PolyRefFunction } from 'react-polymorphed';
import { cva, VariantProps } from 'class-variance-authority';
import { cn } from '@/utils';

const polyRef = forwardRef as PolyRefFunction;

const buttonVariants = cva('py-[5px] px-2 transition rounded min-w-fit cursor-pointer', {
  variants: {
    active: { true: '' },
    variant: {
      ghost: 'hover:bg-editor-secondary',
      'ghost-accented': 'hover:bg-editor-accent/[.15]',
      solid: 'bg-editor-accent hover:bg-editor-accent-light',
    },
  },
  compoundVariants: [
    {
      variant: ['ghost', 'ghost-accented'],
      className: 'hover:text-editor-accent',
    },
    {
      variant: ['ghost', 'ghost-accented'],
      active: true,
      className: 'text-editor-accent',
    },
    {
      variant: 'ghost',
      active: true,
      className: 'bg-editor-secondary',
    },
    {
      variant: 'ghost-accented',
      active: true,
      className: 'bg-editor-accent/[.15]',
    },
    {
      variant: 'solid',
      active: true,
      className: 'bg-editor-accent-light',
    },
  ],
  defaultVariants: {
    variant: 'ghost',
  },
});

type Props = {
  className?: string;
} & VariantProps<typeof buttonVariants>;

const defaultElement = 'button';

const Button = polyRef<typeof defaultElement, Props>(
  ({ as: As = defaultElement, variant, active, className, ...props }, ref) => {
    return (
      <As
        type="button"
        role="button"
        tabIndex={0}
        ref={ref}
        className={cn(buttonVariants({ variant, active }), className)}
        {...props}
      />
    );
  }
);

export default Button;
