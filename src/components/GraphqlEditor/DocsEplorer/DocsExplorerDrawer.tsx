import { memo } from 'react';
import SwipeableDrawer, { SwipableDrawerProps } from '@/components/ui/SwipeableDrawer';
import DocsExplorer from './DocsExplorer';

function DocsExplorerDrawer(props: SwipableDrawerProps) {
  return (
    <SwipeableDrawer {...props}>
      <DocsExplorer />
    </SwipeableDrawer>
  );
}

export default memo(DocsExplorerDrawer);
