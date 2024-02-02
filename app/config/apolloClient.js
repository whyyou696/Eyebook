import { ApolloClient, InMemoryCache } from '@apollo/client';

const apolloClient = new ApolloClient({
    uri: 'https://ed67-180-248-30-109.ngrok-free.app/',
    cache: new InMemoryCache(),
})

export default apolloClient