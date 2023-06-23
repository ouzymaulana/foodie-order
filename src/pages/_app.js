import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "@/styles/globals.css";
import { ThemeProvider } from "@emotion/react";
import Head from "next/head";
import theme from "@/Helper/theme";
import CssBaseline from "@mui/material/CssBaseline";
import store from "@/Redux/Store";
import { Provider } from "react-redux";
// import { PersistGate } from "redux-persist/integration/react";
// import { persistStore } from "redux-persist";

export default function App({ Component, pageProps }) {
  // const persistor = persistStore(store);
  return (
    <>
      <Head>
        <title>foodie Order</title>
      </Head>
      <Provider store={store}>
        {/* <PersistGate loading={null} persistor={persistor}> */}
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Component {...pageProps} />
        </ThemeProvider>
        {/* </PersistGate> */}
      </Provider>
    </>
  );
}
