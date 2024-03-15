import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import PageLayout from 'components/layout';
import Hero from 'components/Hero';
import SignUp from 'components/Signup';
import LogIn from 'components/Login';
import Account from 'components/Account';
import PrivateRoute from 'components/PrivateRoute';
import AuthProvider from 'context/AuthProvider';
import CreateEvent from 'components/Event/CreateEvent';
import MainMap from 'components/MainMap';
import { refreshAccessToken } from 'utils/axios';
import './i18n';
import './App.css';

const authLoader = async () => {
  const token = await refreshAccessToken();
  if(token) return token;
  return null;
}

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      loader={authLoader}
      element={
        <AuthProvider>
          <PageLayout />
        </AuthProvider>
      }
    >
      <Route index element={<Hero />} />
      <Route path="login" element={<LogIn />} />
      <Route path="signup" element={<SignUp />} />
      <Route element={<PrivateRoute />}>
        <Route path="map" element={<MainMap />} />
        <Route path="account" element={<Account />} />
        <Route path="event/create" element={<CreateEvent />} />
        <Route path="event/edit/:eventId" element={<CreateEvent editMode />} />
      </Route>
    </Route>
  )
);
