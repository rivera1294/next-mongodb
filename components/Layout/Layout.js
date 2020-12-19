import Head from 'next/head'
import { Navbar } from './components/Navbar'
import NextNProgress from 'nextjs-progressbar'
// <NextNProgress color="#FFF" startPosition={0.3} stopDelayMs={200} height={2} options={{ showSpinner: false }} />
import { theme, md } from '~/styled-mui/common/theme'
import { ScrollTopButton } from './components'

export const Layout = ({ children }) => {
  return (
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
      <NextNProgress
        // color={theme.palette.primary.main}
        color="rgb(252, 191, 44)"
        startPosition={0.3}
        stopDelayMs={200}
        height={2}
        options={{ showSpinner: true }}
      />
      <Navbar />
      {children}
      <ScrollTopButton />
      <style jsx global>{`
        #nprogress .spinner {
          display: block;
          position: fixed;
          z-index: 1031;
          right: 15px;
        }
        @media (min-width: ${md + 1}px) {
          #nprogress .spinner {
            top: 22px;
          }
        }
        @media (max-width: ${md}px) {
          #nprogress .spinner {
            top: 15px;
          }
        }
      `}</style>
    </>
  )
}
