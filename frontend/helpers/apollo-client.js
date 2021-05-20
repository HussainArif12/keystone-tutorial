import { ApolloClient, InMemoryCache } from "@apollo/client";

console.log("connect uri " + process.env.CONNECT_URI);

const client = new ApolloClient({
  uri: "http://localhost:3000/api/graphql",
  cache: new InMemoryCache(),
});

export default client;
