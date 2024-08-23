import React, { useState } from 'react';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import '@/styles/globals.css';
import { ThemeProvider } from '@emotion/react';
import Head from 'next/head';
import theme from '@/Helper/theme';
import store from '@/Redux/Store';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';
import { Roboto_Mono } from 'next/font/google';
import { CssBaseline, createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';

const roboto_Mono = Roboto_Mono({ subsets: ['latin'] });

export default function App({ Component, pageProps }) {
  const persistor = persistStore(store);
  const [mode, setMode] = useState('light');
  const lightTheme = createTheme({
    palette: {
      mode,
      primary: {
        main: '#FAA41A',
        light: mode === 'light' ? '#eeeeee' : '#525252',
        dark: '#FFFFF',
      },
      secondary: {
        main: grey[600],
        light: mode === 'light' ? 'white' : 'black',
        dark: mode === 'light' ? '#eeeeee' : 'rgba(255, 255, 255, 0.16)',
      },
      error: {
        main: '#F31559',
        // main: grey[400],
      },
      success: {
        main: '#1de9b6',
      },
      colorCustom: {
        input: mode === 'light' ? 'white' : 'rgba(255, 255, 255, 0.16)',
      },
    },
  });

  const toggleDarkMode = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };
  return (
    <>
      <Head>
        <title>foodie Order</title>
        <link rel="icon" href="/img/logo.svg" />
      </Head>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider theme={lightTheme}>
            <CssBaseline />

            <main className={roboto_Mono.className}>
              <Component
                {...pageProps}
                mode={mode}
                toggleDarkMode={toggleDarkMode}
              />
            </main>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </>
  );
}
