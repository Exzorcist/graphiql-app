import { EditorView } from '@codemirror/view';
import { Extension } from '@uiw/react-codemirror';
import { lint, graphqlLanguageSupport, completion, jump, stateExtensions } from 'cm6-graphql';
import { LintSource, linter } from '@codemirror/lint';

const lintSource = (lint as [{ value: { source: LintSource } }] & Extension)[0].value.source;

const customLintSource: LintSource = (view: EditorView) => {
  if (view.state.doc.toString().trim() === '') {
    return [];
  }

  return lintSource(view);
};

export function graphql(...params: Parameters<typeof stateExtensions>): Extension[] {
  return [
    graphqlLanguageSupport(),
    completion,
    linter(customLintSource, {
      delay: 300,
    }),
    jump,
    stateExtensions(...params),
  ];
}
