import '@testing-library/jest-dom/vitest';
import { EditorView } from '@uiw/react-codemirror';

vi.mock('@codemirror/lang-javascript', async (importOriginal) => {
  const mod = await importOriginal<typeof import('@codemirror/lang-javascript')>();
  return {
    ...mod,
    javascript: vi.fn(() => EditorView.theme({})),
  };
});
