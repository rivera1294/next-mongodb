import NextApp from 'next/app'
import 'semantic-ui-css/semantic.min.css'
import Layout from '~/components/Layout'
import 'react-markdown-editor-lite/lib/index.css'
import '~/public/static/css/style.css'
import { AuthContextProvider, GlobalAppContextProvider, NotifsContextProvider, SocketContextProvider } from '~/context'
import { CookiesProvider } from 'react-cookie'
import Head from 'next/head'
import 'react-notifications-component/dist/theme.css'
// preferred way to import (from `v4`). Uses `animate__` prefix.
import 'animate.css/animate.min.css'
import { ThemeProvider } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline'
import { theme } from '~/styled-mui/common/theme'

class MyApp extends NextApp {
  componentDidMount() {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
  }
  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <Head>
          <title>Code Samples</title>
        </Head>
        <ThemeProvider theme={theme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <NotifsContextProvider>
            <CookiesProvider>
              <AuthContextProvider>
                <GlobalAppContextProvider>
                  <SocketContextProvider>
                    <Layout>
                      <Component {...pageProps} />
                    </Layout>
                  </SocketContextProvider>
                </GlobalAppContextProvider>
              </AuthContextProvider>
            </CookiesProvider>
          </NotifsContextProvider>
        </ThemeProvider>
      </>
    )
  }
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);

//   return { ...appProps }
// }

export default MyApp
