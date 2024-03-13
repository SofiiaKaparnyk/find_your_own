import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  Params,
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
import { getEvent, getEvents, getUsers } from 'services';
import './i18n';
import './App.css';

const updateEventLoader = async ({ params }: { params: Params<string>}) => {
  return getEvent(params.eventId as string)
};

const accountLoader = async () => {
  return getEvents();
};

const mapLoader = async () => {
  const data = await Promise.all([getUsers(), getEvents()]);

  return {
    users: data[0],
    events: data[1],
  };
};

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
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
        <Route path="map" loader={mapLoader} element={<MainMap />} />
        <Route path="account" loader={accountLoader} element={<Account />} />
        <Route path="event/create" element={<CreateEvent />} />
        <Route
          path="event/edit/:eventId"
          loader={updateEventLoader}
          element={<CreateEvent editMode />}
        />
      </Route>
    </Route>
  )
);
