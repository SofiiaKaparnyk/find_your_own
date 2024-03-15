import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import LoadingProvider from 'context/LoadingContext';
import { router } from 'router';

import './i18n';
import './App.css';

function App() {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <LoadingProvider>
        <RouterProvider router={router} />
      </LoadingProvider>
    </SnackbarProvider>
  );
}

export default App;
