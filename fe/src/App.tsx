import { RouterProvider } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';

import { router } from 'router';
import './i18n';
import './App.css';

function App() {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <RouterProvider router={router} />
    </SnackbarProvider>
  );
}

export default App;
