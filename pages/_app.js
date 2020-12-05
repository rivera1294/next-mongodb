// import App from 'next/app'
import 'semantic-ui-css/semantic.min.css'
import Layout from '~/components/Layout';
import '~/css/style.css';
import '~/css/old.styles.css';
import '~/css/old.build.editor-js.css';
import 'react-markdown-editor-lite/lib/index.css'
import { AuthContextProvider, GlobalAppContextProvider } from '~/context'
import { CookiesProvider } from 'react-cookie';

function MyApp({ Component, pageProps }) {
    return (
        <CookiesProvider>
            <AuthContextProvider>
                <GlobalAppContextProvider>
                    <Layout>
                        <Component {...pageProps} />
                    </Layout>
                </GlobalAppContextProvider>
            </AuthContextProvider>
        </CookiesProvider>
    )
}

// Only uncomment this method if you have blocking data requirements for
// every single page in your application. This disables the ability to
// perform automatic static optimization, causing every page in your app to
// be server-side rendered.
//
// MyApp.getInitialProps = async (appContext) => {
//   // calls page's `getInitialProps` and fills `appProps.pageProps`
//   const appProps = await App.getInitialProps(appContext);
//
//   return { ...appProps }
// }

export default MyApp