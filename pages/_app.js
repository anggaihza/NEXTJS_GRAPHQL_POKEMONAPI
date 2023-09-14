import AuthStateChangeProvider from '@/context/auth'
import '@/styles/globals.css'
import { UserProvider } from '@/context/user'
import { ApolloProvider } from '@apollo/client'
import { client } from '@/components/Apollo/ApolloClient'


export default function App({ Component, pageProps }) {
  return (
    <>
      <UserProvider>
        <ApolloProvider client={client}>
          <AuthStateChangeProvider>
            <Component {...pageProps} />
          </AuthStateChangeProvider>
        </ApolloProvider>
      </UserProvider>
    </>
  )
}
