import Background from "./Background.tsx";
import Header from "./Header.tsx";
import Container from "./Container.tsx";
import Footer from "./Footer.tsx";
import {  Toaster } from "react-hot-toast";

const App = () => {

  return (
    <>
      <Background />
      <Header />
      <Container/>
      <Footer />
      <Toaster position={"top-center"} />
    </>
  );
}

export default App;
