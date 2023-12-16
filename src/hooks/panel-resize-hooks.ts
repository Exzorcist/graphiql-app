import { useCallback, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { ImperativePanelHandle } from 'react-resizable-panels';

/**
 * Provides panel percantage size based on desired size in pixels
 */
export function usePanelSizeState(panelGroupId: string, sizeInPixels: number) {
  const [size, setSize] = useState(0);

  useLayoutEffect(() => {
    const panelGroup = document.querySelector<HTMLDivElement>(
      `[data-panel-group-id="${panelGroupId}"]`
    );

    if (!panelGroup) {
      throw new Error(`Cannot find PanelGroup element with id: ${panelGroupId}`);
    }

    const direction = panelGroup.getAttribute('data-panel-group-direction');

    if (!direction) {
      throw new Error(
        `PanelGroup with id: ${panelGroupId} is missing "data-panel-group-direction" attribute`
      );
    }

    const resizeHandles = panelGroup.querySelectorAll<HTMLDivElement>(
      `:scope > [data-resize-handle]`
    );

    const offsetProp = direction === 'vertical' ? 'offsetHeight' : 'offsetWidth';

    const observer = new ResizeObserver(() => {
      let space = panelGroup[offsetProp];

      resizeHandles.forEach((resizeHandle) => {
        space -= resizeHandle[offsetProp];
      });

      /**
       * decimal count higher than 10 causes panel's onExpand and onCollapse handlers
       * to not be able to be envoked (library bug)
       */
      const newSize = parseFloat(((sizeInPixels / space) * 100).toFixed(10));
      setSize(newSize);
    });

    observer.observe(panelGroup);

    resizeHandles.forEach((resizeHandle) => {
      observer.observe(resizeHandle);
    });

    return () => {
      observer.disconnect();
    };
  }, [sizeInPixels, setSize, panelGroupId]);

  return [size, setSize] as const;
}

/**
 * Keeps panel in collapsed state when its size is changed
 */
export function useKeepPanelCollapsed(
  panelRef: React.MutableRefObject<ImperativePanelHandle | null>,
  panelMinSize: number,
  sizeDeps: unknown[] = []
) {
  useEffect(() => {
    const panelSize = panelRef.current?.getSize();

    if (!panelSize || panelSize < panelMinSize) {
      panelRef.current?.collapse();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [panelMinSize, panelRef, ...sizeDeps]);
}

/**
 * Collapses panel if its size is not yet safed to localStorage
 */
export function useCollapsePanelInit(
  panelRef: React.MutableRefObject<ImperativePanelHandle | null>,
  autoSaveId: string
) {
  useLayoutEffect(() => {
    if (!localStorage.getItem(`PanelGroup:sizes:${autoSaveId}`)) {
      panelRef.current?.collapse();
    }
  }, [autoSaveId, panelRef]);
}

/**
 * Expands panel to specified default size if it was initially or manually collapsed
 */
export function useDefaultExpandSize(
  panelRef: React.MutableRefObject<ImperativePanelHandle | null>,
  defaultExpandSize: number
) {
  const firstExpand = useRef(true);
  const imperativeCollapse = useRef(false);
  const expandToDefault = useRef(false);

  useEffect(() => {
    const isCollapsed = panelRef.current?.isCollapsed();

    if (isCollapsed && firstExpand.current) {
      expandToDefault.current = true;
    }
  }, [panelRef]);

  const collapse = useCallback(() => {
    imperativeCollapse.current = true;
    panelRef.current?.collapse();
  }, [panelRef]);

  const expand = useCallback(() => {
    if (expandToDefault.current) {
      panelRef.current?.resize(defaultExpandSize);
    } else {
      panelRef.current?.expand();
    }
  }, [panelRef, defaultExpandSize]);

  const onExpand = useCallback(() => {
    firstExpand.current = false;
    expandToDefault.current = false;
  }, []);

  const onCollapse = useCallback(() => {
    if (!imperativeCollapse.current) {
      expandToDefault.current = true;
    }

    imperativeCollapse.current = false;
  }, []);

  return { collapse, expand, onCollapse, onExpand };
}
