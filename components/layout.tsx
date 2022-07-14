// components/layout.js

import Navbar from './navbar'
import Footer from './footer'
import Banner from './banner'
import { Section } from '@/components/library';
import {Box, useColorModeValue} from "@chakra-ui/react"

export default function Layout({ children }) {
  return (
    <>
        
        <Navbar />
        <Banner />
        <Box bg={useColorModeValue('gray.50', 'gray.900')}>
            {children}
          </Box>
        <Footer />
    </>
  )
}