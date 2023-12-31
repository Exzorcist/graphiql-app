import '@testing-library/jest-dom/vitest';
import { act } from '@testing-library/react';
import { EditorView } from '@uiw/react-codemirror';
import { mockResizeObserver, configMocks } from 'jsdom-testing-mocks';

configMocks({ act });
export const resizeObserverMock = mockResizeObserver();

vi.mock('cm6-graphql', async (importOriginal) => {
  const mod = await importOriginal<typeof import('cm6-graphql')>();
  return {
    ...mod,
    graphqlLanguageSupport: vi.fn(() => EditorView.theme({})),
    graphql: vi.fn(() => EditorView.theme({})),
  };
});

vi.mock('@codemirror/lang-json', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@codemirror/lang-json')>();
  return { ...mod, json: vi.fn(() => EditorView.theme({})) };
});

vi.mock('@/hooks/panel-resize-hooks', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/hooks/panel-resize-hooks')>();
  return { ...mod, useKeepPanelCollapsed: vi.fn() };
});
