import '@testing-library/jest-dom/vitest';
import { act } from '@testing-library/react';
import { mockResizeObserver, configMocks } from 'jsdom-testing-mocks';
import { dummyCMExtension } from '@/utils/dummyCMExtension';

configMocks({ act });
export const resizeObserverMock = mockResizeObserver();

vi.mock('cm6-graphql', async (importOriginal) => {
  const mod = await importOriginal<typeof import('cm6-graphql')>();
  return {
    ...mod,
    graphqlLanguageSupport: vi.fn(() => dummyCMExtension),
    graphql: vi.fn(() => dummyCMExtension),
  };
});

vi.mock('codemirror-json-schema', () => {
  return {
    updateSchema: vi.fn(),
    jsonSchemaLinter: vi.fn(),
    jsonCompletion: vi.fn(),
    jsonSchemaHover: vi.fn(),
    stateExtensions: vi.fn(),
  };
});

vi.mock('@/components/GraphqlEditor/GraphqlTools/utils', async (importOriginal) => {
  const mod =
    await importOriginal<typeof import('@/components/GraphqlEditor/GraphqlTools/utils')>();
  return {
    ...mod,
    variablesJsonSchema: vi.fn(() => dummyCMExtension),
  };
});

vi.mock('@/components/GraphqlEditor/RequestPanel/utils', async (importOriginal) => {
  const mod =
    await importOriginal<typeof import('@/components/GraphqlEditor/RequestPanel/utils')>();
  return {
    ...mod,
    graphql: vi.fn(() => dummyCMExtension),
  };
});

vi.mock('@codemirror/lang-json', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@codemirror/lang-json')>();
  return { ...mod, json: vi.fn(() => dummyCMExtension) };
});

vi.mock('@codemirror/language', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@codemirror/language')>();
  return { ...mod, foldGutter: vi.fn(() => dummyCMExtension) };
});

vi.mock('@/hooks/panel-resize-hooks', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@/hooks/panel-resize-hooks')>();
  return { ...mod, useKeepPanelCollapsed: vi.fn() };
});
