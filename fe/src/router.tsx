import React from 'react';
import {
  Navigate,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom';

import PageLayout from 'components/Layout';
import Hero from 'components/Hero';
import SignUp from 'components/Signup';
import LogIn from 'components/Login';
import PrivateRoute from 'components/PrivateRoute';
import AuthProvider from 'context/AuthProvider';
import CreateEvent from 'components/Event/CreateEvent';
import { refreshAccessToken } from 'utils/axios';
import AccountPage from 'pages/AccountPage';
import MapPage from 'pages/MapPage';
import SecuritySettingsPage from 'pages/SecuritySettingsPage';
import LocationSettingsPage from 'pages/LocationSettingsPage';
import GeneralSettingsPage from 'pages/GeneralSettingsPage';
import './i18n';
import './App.css';
import EventCalendarPage from 'pages/EventCalendarPage';

const authLoader = async () => {
  const token = await refreshAccessToken();
  if (token) return token;
  return null;
};

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
        <Route path="account" element={<AccountPage />} />
        <Route path="map" element={<MapPage />} />
        <Route path="event-calendar" element={<EventCalendarPage />} />
        <Route path="settings">
          <Route index element={<Navigate to="general" />} />
          <Route path="general" element={<GeneralSettingsPage />} />
          <Route path="security" element={<SecuritySettingsPage />} />
          <Route path="location" element={<LocationSettingsPage />} />
        </Route>
        <Route path="event/create" element={<CreateEvent />} />
        <Route path="event/edit/:eventId" element={<CreateEvent editMode />} />
      </Route>
    </Route>
  )
);
