import { ComponentProps } from 'react';
import { cn } from '@/utils';

type Props = {
  variant?: keyof typeof buttonStyle.variant;
} & ComponentProps<'button'>;

const buttonStyle = {
  base: 'py-[5px] px-2 hover:bg-editor-secondary hover:text-editor-accent transition rounded min-w-fit',
  variant: {
    active: 'bg-editor-secondary text-editor-accent',
    solid: 'bg-editor-accent hover:bg-editor-accent-light hover:text-inherit',
  },
};

function Button({ className, variant, children, ...delegated }: Props) {
  return (
    <button
      className={cn(buttonStyle.base, variant && buttonStyle.variant[variant], className)}
      type="button"
      {...delegated}
    >
      {children}
    </button>
  );
}

export default Button;
