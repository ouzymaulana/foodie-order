import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import Head from 'next/head';
import theme from '@/Helper/theme';
import CssBaseline from '@mui/material/CssBaseline';
import store from '@/Redux/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Josefin_Sans, Roboto_Mono } from 'next/font/google';

const josefin_Sans = Josefin_Sans({ subsets: ['latin'] });
const roboto_Mono = Roboto_Mono({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  const persistor = persistStore(store);
  return (
    <>
      <Head>
        <title>foodie Order</title>
        <link rel="icon" href="/img/logo.svg" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={theme}>
            {/* <CssBaseline /> */}
            <main className={roboto_Mono.className}>
              <Component {...pageProps} />
            </main>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
