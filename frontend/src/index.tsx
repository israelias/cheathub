import { StrictMode } from 'react';
import { render } from 'react-dom';
import { ChakraProvider, extendTheme } from '@chakra-ui/react';
import globalTheme from './styles/theme';
import App from './App';
import * as serviceWorker from './serviceWorker';

render(
  <StrictMode>
    <ChakraProvider theme={globalTheme}>
      <App />
    </ChakraProvider>
  </StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
