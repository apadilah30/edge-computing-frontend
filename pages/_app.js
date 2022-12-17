import '../styles/globals.css'
import '../styles/mapbox.css'
import { NextUIProvider } from '@nextui-org/react';

function MyApp({ Component, pageProps }) {
  return (
    <NextUIProvider theme="light">
      <Component {...pageProps} />
    </NextUIProvider>
  )
}

export default MyApp
