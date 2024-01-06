import { ComponentProps, useCallback, useEffect, useRef } from 'react';
import { ImperativePanelHandle, Panel } from 'react-resizable-panels';
import { useDefaultExpandSize } from '@/hooks/panel-resize-hooks';
import DocsExplorerContainer from './DocsExplorerContainer';

export type DocsExplorerPanelProps = {
  show?: boolean;
  onShowChange?: (isShowing: boolean) => void;
  panelClassName?: string;
} & ComponentProps<typeof Panel>;

const DOCS_PANEL_MIN_SIZE = 20;
const DOCS_PANEL_DEFAULT_SIZE = 25;
const DOCS_PANEL_COLLAPSE_SIZE = 0;

function DocsExplorerPanel({
  show,
  onShowChange,
  panelClassName,
  ...panelProps
}: DocsExplorerPanelProps) {
  const docsPanelRef = useRef<ImperativePanelHandle | null>(null);

  const { collapse, expand, onExpand, onCollapse } = useDefaultExpandSize(
    docsPanelRef,
    DOCS_PANEL_DEFAULT_SIZE
  );

  useEffect(() => {
    if (show) {
      expand();
    } else {
      collapse();
    }
  }, [show, expand, collapse]);

  const handleDocsExpand = useCallback(() => {
    onExpand();
    onShowChange?.(true);
  }, [onExpand, onShowChange]);

  const handleDocsCollapse = useCallback(() => {
    onCollapse();
    onShowChange?.(false);
  }, [onCollapse, onShowChange]);

  return (
    <Panel
      ref={docsPanelRef}
      collapsible
      collapsedSize={DOCS_PANEL_COLLAPSE_SIZE}
      minSize={DOCS_PANEL_MIN_SIZE}
      defaultSize={DOCS_PANEL_MIN_SIZE}
      onCollapse={handleDocsCollapse}
      onExpand={handleDocsExpand}
      className={panelClassName}
      {...panelProps}
    >
      <DocsExplorerContainer />
    </Panel>
  );
}

export default DocsExplorerPanel;
