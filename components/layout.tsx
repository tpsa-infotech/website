// components/layout.js

import Navbar from './navbar'
import Footer from './footer'
import Banner from './banner'

export default function Layout({ children }) {
  return (
    <>
        
        <Navbar />
        <Banner />
        <main>{children}</main>
        <Footer />
    </>
  )
}