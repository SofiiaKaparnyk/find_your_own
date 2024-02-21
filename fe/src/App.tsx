import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import PageLayout from './components/layout';
import Hero from './components/Hero';
import "./i18n";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PageLayout />}>
          <Route index element={<Hero />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
