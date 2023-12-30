import { GraphQLSchema, parse } from 'graphql';
import { JSONSchema7 } from 'json-schema';
import { collectVariables, getVariablesJSONSchema } from 'graphql-language-service';
import { EditorView } from '@codemirror/view';
import { jsonParseLinter } from '@codemirror/lang-json';

export function buildVariablesJSONSchema(schema: GraphQLSchema, queryValue: string) {
  const variablesToType = collectVariables(schema, parse(queryValue));
  return getVariablesJSONSchema(variablesToType) as JSONSchema7;
}

const jsonLinter = jsonParseLinter();

export function customJsonParseLinter() {
  return (view: EditorView) => {
    if (view.state.doc.toString().trim() === '') {
      return [];
    }

    return jsonLinter(view);
  };
}
