import {
  jsonSchemaHover,
  jsonCompletion,
  jsonSchemaLinter,
  stateExtensions,
} from 'codemirror-json-schema';
import { collectVariables, getVariablesJSONSchema } from 'graphql-language-service';
import { json, jsonLanguage, jsonParseLinter } from '@codemirror/lang-json';
import { GraphQLError, GraphQLSchema, parse } from 'graphql';
import { hoverTooltip } from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { JSONSchema7 } from 'json-schema';
import { linter } from '@codemirror/lint';

export function buildVariablesJSONSchema(schema: GraphQLSchema | undefined, queryValue: string) {
  if (!schema) return undefined;

  try {
    const variablesToType = collectVariables(schema, parse(queryValue));
    const schemaJson = getVariablesJSONSchema(variablesToType);
    schemaJson.$schema = 'http://json-schema.org/draft-07/schema#';
    schemaJson.additionalProperties = false;
    return schemaJson as JSONSchema7;
  } catch (err) {
    if (err instanceof GraphQLError) {
      return undefined;
    }

    throw err;
  }
}

const lintJson = jsonParseLinter();
const lintJsonSchema = jsonSchemaLinter();

export function customJsonLinter() {
  return (view: EditorView) => {
    if (view.state.doc.toString().trim() === '') {
      return [];
    }

    const parseErrors = lintJson(view);
    const schemaErrors = lintJsonSchema(view).filter(
      (d) => d.from !== undefined && d.to !== undefined
    );

    return [...schemaErrors, ...parseErrors];
  };
}

export function variablesJsonSchema(...params: Parameters<typeof buildVariablesJSONSchema>) {
  return [
    json(),
    linter(customJsonLinter(), {
      delay: 300,
    }),
    jsonLanguage.data.of({
      autocomplete: jsonCompletion(),
    }),
    hoverTooltip(jsonSchemaHover()),
    stateExtensions(buildVariablesJSONSchema(...params)),
  ];
}
