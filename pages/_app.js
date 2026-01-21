import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css"; // keep yours if you have it

import CostumeNavBar from "../components/CostumeNavBar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CostumeNavBar />
      <Component {...pageProps} />
    </>
  );
}
