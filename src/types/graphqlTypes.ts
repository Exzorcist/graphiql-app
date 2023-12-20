import { GraphQLField, GraphQLType } from 'graphql';

export type GraphQLAnyField = GraphQLField<unknown, unknown>;

export type GraphQLDocsEntry = GraphQLType | GraphQLAnyField;

export function isGraphQLField(object: object): object is GraphQLAnyField {
  return [
    'name',
    'description',
    'type',
    'args',
    'deprecationReason',
    'extensions',
    'astNode',
  ].every((key) => key in object);
}
