import { ApolloClient, InMemoryCache, HttpLink } from '@apollo/client';

const cache = new InMemoryCache();
const link = new HttpLink({
    uri: 'https://graphqlpokemon.favware.tech/v7',
});

const client = new ApolloClient({
    cache: cache,
    link: link,
    name: 'graphql-pokemon-client',
    version: '1.0',
    queryDeduplication: false,
    defaultOptions: {
        watchQuery: {
            fetchPolicy: 'cache-and-network',
        },
    },
});

export { client };
