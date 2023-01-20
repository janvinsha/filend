import { ApolloClient, from, HttpLink } from "@apollo/client";

import cache from "./cache";

const apolloClient = new ApolloClient({
  cache,
});

export default apolloClient;
