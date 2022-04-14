import { ChakraProvider, extendTheme  } from '@chakra-ui/react'
import { QueryClient, QueryClientProvider } from 'react-query';
import { theme } from '@chakra-ui/pro-theme'
import '@fontsource/inter/variable.css'
import Layout from '../components/layout'

const myTheme = extendTheme(
  {
    colors: { ...theme.colors, brand: theme.colors.blue },
  },
  theme,
)

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={myTheme}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export default MyApp