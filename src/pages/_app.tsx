import ReduxProvider from "@/components/ReduxProvider/ReduxProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import NextNProgress from "nextjs-progressbar";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ReduxProvider>
      <NextNProgress
        color='#29D'
        startPosition={0.3}
        stopDelayMs={200}
        height={3}
        showOnShallow={false}
        options={{
          showSpinner: false,
        }}
      />
      <Component {...pageProps} />
    </ReduxProvider>
  );
}
