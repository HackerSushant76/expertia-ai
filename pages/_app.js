import { AppContextProvider } from "../Components/AppContext";
import "../styles/globals.css"
export default function App({ Component, pageProps }) {
  return (
    <AppContextProvider>
      <Component {...pageProps} />
    </AppContextProvider>
  );
}
