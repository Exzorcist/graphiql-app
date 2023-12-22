import {
  GraphQLArgument,
  GraphQLField,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLObjectType,
  GraphQLType,
} from 'graphql';

export type GraphQLAnyField = GraphQLField<unknown, unknown>;

export type GraphQLDocsEntry = GraphQLObjectType | GraphQLAnyField | GraphQLArgument;

export function isTypeWithFields(
  type: GraphQLType | GraphQLDocsEntry
): type is GraphQLInterfaceType | GraphQLInputObjectType | GraphQLObjectType {
  return 'getFields' in type;
}

export function isGraphQLField(type: GraphQLDocsEntry): type is GraphQLAnyField {
  return 'args' in type;
}
