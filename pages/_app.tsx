import { AppProps } from "next/app";
import "../styles/globals.css";
import { Provider as AppContextProvider } from "@/contexts/app";
import { Provider as AuthContextProvider } from "@/contexts/auth";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <AuthContextProvider>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </AuthContextProvider>
  );
}

export default MyApp;
