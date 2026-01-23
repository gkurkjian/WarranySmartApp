import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/globals.css";
import CostumeNavBar from "../components/CostumeNavBar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <>
      <CostumeNavBar />
      <div className="container py-4">
        <Component {...pageProps} />
      </div>
      <Footer />
    </>
  );
}