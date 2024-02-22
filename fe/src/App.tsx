import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageLayout from './components/layout';
import Hero from './components/Hero';
import './i18n';
import './App.css';
import SignUp from 'components/Signup';
import LogIn from 'components/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<Hero />} />
          <Route path="login" element={<LogIn />} />
          <Route path="signup" element={<SignUp />} />
          {/* <Route path="about" element={<SignUp />} /> */}
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
