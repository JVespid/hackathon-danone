import "JV/styles/globals.scss";
import Global from "JV/services/context/global/global";
import Head from "next/head";


export default function App({ Component, pageProps }) {
  return (
    <>
    <Head>
    <link rel="icon" type="image/svg+xml" href="/svg/svg-2-ninioSolo.svg" />
    </Head>
    <Global>
      <Component {...pageProps} />
    </Global>
    </>
  );
}
