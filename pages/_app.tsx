import { AppProps } from "next/app";
import "../styles/globals.css";
import { AppContextProvider } from "@/contexts/AppContext";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}

export default MyApp;
