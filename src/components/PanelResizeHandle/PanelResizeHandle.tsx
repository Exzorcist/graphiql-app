import { ComponentPropsWithoutRef, memo } from 'react';
import { PanelResizeHandle as PanelResizeHandleLib } from 'react-resizable-panels';
import { cn } from '@/utils/cn';
import styles from './PanelResizeHandle.module.css';

function PanelResizeHandle({
  className,
  ...delegated
}: ComponentPropsWithoutRef<typeof PanelResizeHandleLib>) {
  return (
    <PanelResizeHandleLib className={cn('z-50 group', className)} {...delegated}>
      <div className={styles.ResizeHandleGutter}>
        <div className={cn(styles.ResizeHandleDragArea, 'peer')} />
        <div
          className={cn(
            styles.ResizeHandleHoverArea,
            'peer-hover:delay-150 peer-hover:opacity-100 group-data-[resize-handle-active]:opacity-100'
          )}
        />
      </div>
    </PanelResizeHandleLib>
  );
}

export default memo(PanelResizeHandle);
