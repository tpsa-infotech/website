import { ChakraProvider, extendTheme  } from '@chakra-ui/react'

import Layout from '../components/layout'

import { theme } from '@chakra-ui/pro-theme'
import '@fontsource/inter/variable.css'

const myTheme = extendTheme(
  {
    colors: { ...theme.colors, brand: theme.colors.blue },
  },
  theme,
)

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={myTheme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  )
}

export default MyApp