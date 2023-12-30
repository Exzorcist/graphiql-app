import { EditorView } from '@codemirror/view';
import { Extension } from '@uiw/react-codemirror';
import {
  lint as _lint,
  graphqlLanguageSupport,
  completion,
  jump,
  stateExtensions,
} from 'cm6-graphql';
import { LintSource } from '@codemirror/lint';

const lint = _lint as [{ value: { source: LintSource } }] & Extension;
const lintSource = lint[0].value.source;

const customLintSource: LintSource = (view: EditorView) => {
  if (view.state.doc.toString().trim() === '') {
    return [];
  }

  return lintSource(view);
};

lint[0].value.source = customLintSource;

export function graphql(...params: Parameters<typeof stateExtensions>): Extension[] {
  return [graphqlLanguageSupport(), completion, lint, jump, stateExtensions(...params)];
}
