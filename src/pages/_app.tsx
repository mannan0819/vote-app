import { withTRPC } from "@trpc/next";
import { AppType } from "next/dist/shared/lib/utils";
import Head from "next/head";
import superjson from "superjson";
import { AppRouter } from "../backend/router";
import "../styles/globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import Nav from "../components/NavBar";

const MyApp: AppType = ({ Component, pageProps }) => {
  return <div>
    <Head>
      <link
        href="https://fonts.googleapis.com/css?family=Nunito"
        rel="stylesheet"
      />
      <title>VOTES - APP By Mannan</title>
    </Head>
    <Nav />
    <div className="container justify-between items-center mx-auto">
      <Component {...pageProps} />
    </div>
  </div >;
};

function getBaseUrl() {
  if (process.browser) return "";
  if (process.env.VERCEL_URL === "development")
    return `https://${process.env.VERCEL_URL}`;
  return `http://localhost:${process.env.PORT ?? 3000}`;
}

export default withTRPC<AppRouter>({
  config({ ctx }) {
    /**
     * If you want to use SSR, you need to use the server's full URL
     * @link https://trpc.io/docs/ssr
     */
    const url = `${getBaseUrl()}/api/trpc`;

    return {
      headers() {
        return {
          cookie: ctx?.req?.headers?.cookie,
        };
      },
      url,
      transformer: superjson,
      /**
       * @link https://react-query.tanstack.com/reference/QueryClient
       */
      // queryClientConfig: { defaultOptions: { queries: { staleTime: 60 } } },
    };
  },
  /**
   * @link https://trpc.io/docs/ssr
   */
  ssr: true,
})(MyApp);
