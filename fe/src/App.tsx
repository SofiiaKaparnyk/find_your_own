import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import PageLayout from './components/layout';
import Hero from './components/Hero';
import SignUp from 'components/Signup';
import LogIn from 'components/Login';
import Home from 'components/Home';
import AuthProvider from 'context/AuthProvider';
import './i18n';
import './App.css';
import PrivateRoute from 'components/PrivateRoute';
import Account from 'components/Account';

function App() {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<PageLayout />}>
              <Route index element={<Hero />} />
              <Route path="login" element={<LogIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route element={<PrivateRoute />}>
                <Route path="map" element={<Home />} />
                <Route path="account" element={<Account />} />
              </Route>
              {/* <Route path="about" element={<SignUp />} /> */}
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </SnackbarProvider>
  );
}

export default App;
