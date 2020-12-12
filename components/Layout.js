import Head from 'next/head'
import Navbar from './Navbar'
import NextNProgress from 'nextjs-progressbar'
// <NextNProgress color="#FFF" startPosition={0.3} stopDelayMs={200} height={2} options={{ showSpinner: false }} />

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
    <NextNProgress color="#6dffff" startPosition={0.3} stopDelayMs={200} height={2} options={{ showSpinner: true }} />
    <Navbar />
    {children}
    <style jsx global>{`
      #nprogress .spinner {
        display: block;
        position: fixed;
        z-index: 1031;
        top: 20px;
        right: 15px;
      }
    `}</style>
  </>
)

export default Layout
