// components/layout.js

import Navbar from './navbar'
import Footer from './footer'
import Banner from './banner'
import { Section } from '@/components/library';

export default function Layout({ children }) {
  return (
    <>
        
        <Navbar />
        <Banner />
        <main>
          <Section>
            {children}
          </Section>
          </main>
        <Footer />
    </>
  )
}