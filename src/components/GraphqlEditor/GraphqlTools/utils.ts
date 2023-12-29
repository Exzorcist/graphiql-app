import { GraphQLSchema, parse } from 'graphql';
import { JSONSchema7 } from 'json-schema';
import { collectVariables, getVariablesJSONSchema } from 'graphql-language-service';

export function buildVariablesJSONSchema(schema: GraphQLSchema, queryValue: string) {
  const variablesToType = collectVariables(schema, parse(queryValue));
  return getVariablesJSONSchema(variablesToType) as JSONSchema7;
}
