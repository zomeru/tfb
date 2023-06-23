import { DocumentNode } from 'graphql';
import gql from 'graphql-tag';

export const typeDefs: DocumentNode = gql`
  scalar DateTime
  scalar JSON

  type Query {
    hello: String!
  }
`;
