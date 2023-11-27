import { App } from '@/App';
import { theme } from '@/theme';

import { ChakraProvider } from '@chakra-ui/react';
import { createRoot } from 'react-dom/client';

const rootElement: any = document.getElementById('app-root');
const root = createRoot(rootElement);

root.render(
  <ChakraProvider theme={theme} resetCSS={true}>
    <App />
  </ChakraProvider>,
);
