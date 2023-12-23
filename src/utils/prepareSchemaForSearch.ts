/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-restricted-syntax */

import { GraphQLSchema, GraphQLType, getNamedType } from 'graphql';
import {
  GraphQLDocsEntry,
  GraphQLTypeWithFields,
  isGraphQLArgument,
  isGraphQLField,
  isTypeWithFields,
  isUtilType,
} from '@/types/graphqlTypes';

/* function composeDocsSearchEntries(schema: GraphQLSchema) {
  const searchableTypes = Object.values(schema.getTypeMap()).filter(
    (type) => isObjectType(type) && !isUtilType(type)
  );
} */

export function attachNavStackToSchemaEntries(schema: GraphQLSchema) {
  function attachRec(entry: GraphQLDocsEntry, navStack: GraphQLDocsEntry[]) {
    if ('navStack' in entry) {
      return;
    }

    navStack.push(entry);
    Object.assign(entry, { navStack: navStack.slice() });

    if (isGraphQLField(entry) || isGraphQLArgument(entry)) {
      if (isGraphQLField(entry)) {
        for (const arg of entry.args) {
          attachRec(arg, navStack.slice());
        }
      }

      const fieldType = getNamedType(entry.type);
      iterateTypeFields(fieldType, navStack.slice());

      return;
    }

    iterateTypeFields(entry, navStack.slice());
  }

  function iterateTypeFields(entry: GraphQLType, navStack: GraphQLDocsEntry[]) {
    const namedType = getNamedType(entry);

    if (isTypeWithFields(namedType) && !isUtilType(namedType)) {
      const fields = Object.values((entry as GraphQLTypeWithFields).getFields());

      for (const field of fields) {
        attachRec(field, navStack.slice());
      }
    }
  }

  attachRec(schema.getQueryType()!, []);

  return schema;
}
