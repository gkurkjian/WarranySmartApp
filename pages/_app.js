import "@/styles/globals.css";
import CustomNavbar from "@/components/CostumeNavBar";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CustomNavbar />
      <Component {...pageProps} />
    </>
  );
}
