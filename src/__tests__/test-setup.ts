import '@testing-library/jest-dom/vitest';
import { EditorView } from '@uiw/react-codemirror';
import { act } from '@testing-library/react';
import { mockResizeObserver, configMocks } from 'jsdom-testing-mocks';

configMocks({ act });
export const resizeObserverMock = mockResizeObserver();

vi.mock('@codemirror/lang-javascript', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@codemirror/lang-javascript')>();
  return {
    ...mod,
    javascript: vi.fn(() => EditorView.theme({})),
  };
});

vi.mock('@/hooks/panel-resize-hooks', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/hooks/panel-resize-hooks')>();
  return { ...mod, useKeepPanelCollapsed: vi.fn() };
});
