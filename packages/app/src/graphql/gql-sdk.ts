import { GraphQLClient } from 'graphql-request';
import { getSdk } from './generated/graphql';

export const client = new GraphQLClient(process.env.REACT_APP__GRAPHQL_URL);
export const sdk = getSdk(client);
