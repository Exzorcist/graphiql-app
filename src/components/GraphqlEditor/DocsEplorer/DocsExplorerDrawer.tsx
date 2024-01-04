import { memo } from 'react';
import SwipeableDrawer, { SwipableDrawerProps } from '@/components/ui/SwipeableDrawer';
import DocsExplorerContainer from './DocsExplorerContainer';

function DocsExplorerDrawer(props: SwipableDrawerProps) {
  return (
    <SwipeableDrawer {...props}>
      <DocsExplorerContainer />
    </SwipeableDrawer>
  );
}

export default memo(DocsExplorerDrawer);
