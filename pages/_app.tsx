import type { AppProps /*, AppContext */ } from 'next/app'
import "public/css/reset.css";

const MyApp = ({ Component, pageProps }: AppProps)=> {
  return <Component {...pageProps} />
}
export default MyApp