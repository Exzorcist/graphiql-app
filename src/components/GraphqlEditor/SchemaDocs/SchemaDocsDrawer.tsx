import { memo } from 'react';
import SwipeableDrawer, { SwipableDrawerProps } from '@/components/ui/SwipeableDrawer';
import SchemaDocs from './SchemaDocs';

function SchemaDocsDrawer(props: SwipableDrawerProps) {
  return (
    <SwipeableDrawer {...props}>
      <SchemaDocs />
    </SwipeableDrawer>
  );
}

export default memo(SchemaDocsDrawer);
