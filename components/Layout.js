import Head from 'next/head'
import Navbar from './Navbar'

const Layout = ({ children }) => (
  <>
    <Head>
      <title>Note App</title>
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link href="https://fonts.googleapis.com/css?family=Montserrat:400,500" rel="stylesheet" />
      <link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons" />
      <link
        rel="stylesheet"
        href="https://use.fontawesome.com/releases/v5.8.0/css/all.css"
        integrity="sha384-Mmxa0mLqhmOeaE8vgOSbKacftZcsNYDjQzuCOm6D02luYSzBG8vpaOykv9lFQ51Y"
        crossOrigin="anonymous"
      />
    </Head>
    <Navbar />
    {children}
  </>
)

export default Layout
