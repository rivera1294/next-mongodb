import NextApp from 'next/app';
import 'semantic-ui-css/semantic.min.css'
import Layout from '~/components/Layout';
import 'react-markdown-editor-lite/lib/index.css'
import { AuthContextProvider, GlobalAppContextProvider } from '~/context'
import { CookiesProvider } from 'react-cookie';
import Head from 'next/head';

class MyApp extends NextApp {
    render() {
        const { Component, pageProps } = this.props;
        return (
            <>
                <Head>
                    <meta charSet="utf-8" />
                    <link rel="icon" href="/static/favicon.ico" />
                    <meta name="theme-color" content="#2f2f2f" />
                    <meta name="viewport" content="width=device-width" />
                    <meta name="viewport" content="initial-scale=1, maximum-scale=1" />
                    <title>Code Samples</title>
                    <link rel="stylesheet" href="/static/css/old.styles.css" />
                    <link rel="stylesheet" href="/static/css/old.build.editor-js.css" />
                    <link rel="stylesheet" href="/static/css/style.css" />
                </Head>
                <CookiesProvider>
                    <AuthContextProvider>
                        <GlobalAppContextProvider>
                            <Layout>
                                <Component {...pageProps} />
                            </Layout>
                        </GlobalAppContextProvider>
                    </AuthContextProvider>
                </CookiesProvider>
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