import { GraphQLError, GraphQLSchema, parse } from 'graphql';
import { JSONSchema7 } from 'json-schema';
import { collectVariables, getVariablesJSONSchema } from 'graphql-language-service';
import { EditorView } from '@codemirror/view';
import { jsonParseLinter } from '@codemirror/lang-json';

export function buildVariablesJSONSchema(schema: GraphQLSchema, queryValue: string) {
  try {
    const variablesToType = collectVariables(schema, parse(queryValue));
    return getVariablesJSONSchema(variablesToType) as JSONSchema7;
  } catch (err) {
    if (err instanceof GraphQLError) {
      return undefined;
    }

    throw err;
  }
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
