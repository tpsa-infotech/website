import { ChakraProvider, extendTheme  } from '@chakra-ui/react'
import { Hydrate, QueryClient, QueryClientProvider } from 'react-query'
import { theme } from '@chakra-ui/theme'
import '@fontsource/inter/variable.css'
import Layout from '../components/layout'
import React from 'react'


const myTheme = extendTheme(
  {
    colors: { ...theme.colors, brand: theme.colors.blue },
  },
  theme,
)

function MyApp({ Component, pageProps }) {
  const [queryClient] = React.useState(() => new QueryClient())
  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={myTheme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}

export default MyApp