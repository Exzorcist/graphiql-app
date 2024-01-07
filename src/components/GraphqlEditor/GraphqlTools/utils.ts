import {
  jsonCompletion,
  jsonSchemaLinter,
  stateExtensions,
  jsonSchemaHover,
} from 'codemirror-json-schema';
import { collectVariables, getVariablesJSONSchema } from 'graphql-language-service';
import { json, jsonLanguage, jsonParseLinter } from '@codemirror/lang-json';
import { DocumentNode, GraphQLError, GraphQLSchema } from 'graphql';
import { hoverTooltip } from '@uiw/react-codemirror';
import { EditorView } from '@codemirror/view';
import { JSONSchema7 } from 'json-schema';
import { linter } from '@codemirror/lint';
import { Side } from 'codemirror-json-schema/dist/types';

export function buildVariablesJSONSchema(
  schema: GraphQLSchema | undefined,
  documentAST: DocumentNode | null
) {
  if (!schema || !documentAST) return undefined;

  try {
    const variablesToType = collectVariables(schema, documentAST);
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
    const schemaErrors = lintJsonSchema(view)
      .filter((d) => d.from !== undefined && d.to !== undefined)
      .map((diagnostic) => ({ ...diagnostic, source: undefined }));

    return [...schemaErrors, ...parseErrors];
  };
}

const jsonHoverTooltipCreator = jsonSchemaHover({
  formatHover: (hoverText) => {
    const div = document.createElement('div');
    div.textContent = hoverText.message;
    div.classList.add('px-1');
    return div;
  },
});

const customJsonSchemaHover = async (view: EditorView, pos: number, side: Side) => {
  const res = await jsonHoverTooltipCreator(view, pos, side);

  const textContent = res?.create(view).dom.textContent;

  if (!textContent?.trim()) {
    return null;
  }

  return res;
};

export function variablesJsonSchema(...params: Parameters<typeof buildVariablesJSONSchema>) {
  return [
    json(),
    linter(customJsonLinter(), {
      delay: 300,
    }),
    jsonLanguage.data.of({
      autocomplete: jsonCompletion(),
    }),
    hoverTooltip(customJsonSchemaHover),
    stateExtensions(buildVariablesJSONSchema(...params)),
  ];
}
