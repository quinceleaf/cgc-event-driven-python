import { DataProvider } from "../context/dataContext";
import "../styles/index.css";
import "react-datepicker/dist/react-datepicker.css";
import "reoverlay/lib/ModalWrapper.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <DataProvider>
      <Component {...pageProps} />
    </DataProvider>
  );
}
