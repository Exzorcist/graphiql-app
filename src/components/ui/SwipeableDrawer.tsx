import { ComponentProps, ReactNode, useCallback, useEffect, useState } from 'react';
import { useSwipeable } from 'react-swipeable';
import Drawer, { DrawerContentProps } from './Drawer';
import { capitalize, cn } from '@/utils';

export type SwipableDrawerProps = {
  trigger?: ReactNode;
  contentClassName?: string;
  side?: NonNullable<DrawerContentProps['side']>;
} & ComponentProps<typeof Drawer> &
  DrawerContentProps;

function SwipeableDrawer({
  children,
  trigger,
  modal,
  open = false,
  side = 'right',
  defaultOpen,
  onOpenChange,
  contentClassName,
  ...contentProps
}: SwipableDrawerProps) {
  const [isOpen, setIsOpen] = useState(open);

  useEffect(() => {
    setIsOpen(open);
  }, [open]);

  const handleOpenChange = useCallback(
    (state: boolean) => {
      setIsOpen(state);
      onOpenChange?.(state);
    },
    [onOpenChange]
  );

  const handlers = useSwipeable({
    [`onSwiped${capitalize(side)}`]: () => handleOpenChange(false),
  });

  return (
    <Drawer modal={modal} defaultOpen={defaultOpen} open={isOpen} onOpenChange={handleOpenChange}>
      {trigger && <Drawer.Trigger asChild>{trigger}</Drawer.Trigger>}
      <Drawer.Content side={side} className={cn(contentClassName)} {...handlers} {...contentProps}>
        {children}
      </Drawer.Content>
    </Drawer>
  );
}

export default SwipeableDrawer;
