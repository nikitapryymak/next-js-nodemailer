import { ChakraProvider } from "@chakra-ui/react";
import AppContainer from "../components/AppContainer";

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider>
      <AppContainer>
        <Component {...pageProps} />
      </AppContainer>
    </ChakraProvider>
  );
}

export default MyApp;
