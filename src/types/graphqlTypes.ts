import {
  GraphQLArgument,
  GraphQLField,
  GraphQLInputObjectType,
  GraphQLInterfaceType,
  GraphQLNamedType,
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

export function isUtilType(type: GraphQLNamedType) {
  return type.name.startsWith('_');
}
