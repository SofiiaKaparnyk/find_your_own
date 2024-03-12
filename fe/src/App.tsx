import React from 'react';
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from 'react-router-dom';
import { SnackbarProvider } from 'notistack';
import PageLayout from './components/layout';
import Hero from './components/Hero';
import SignUp from 'components/Signup';
import LogIn from 'components/Login';
import Account from 'components/Account';
import PrivateRoute from 'components/PrivateRoute';
import AuthProvider from 'context/AuthProvider';
import CreateEvent from 'components/Event/CreateEvent';
import './i18n';
import './App.css';
import { Endpoints } from './constants';
import { axiosInstance } from 'utils/axios';
import { IEvent } from 'types/events';
import handleError from 'utils/errorHandler';
import MainMap from 'components/MainMap';
import { IUser } from 'types/users';

const getEvent = async ({ params }: any): Promise<null | {event: IEvent<Date>}> => {
  return axiosInstance
    .get<IEvent>(`${Endpoints.EVENT}${params.eventId}`)
    .then((res) => {
      if (res.statusText === 'OK') {
        return {event: { ...res.data, date: new Date(res.data.date) }};
      }
      return null;
    })
    .catch((err) => {
      handleError(err);
      return null;
    });
};

const getEvents = async () => {
  return axiosInstance
    .get<IEvent[]>(Endpoints.EVENTS)
    .then((res) => {
      if (res.statusText === 'OK') {
        return res.data;
      }
      return null;
    })
    .catch((err) => {
      handleError(err);
      return null;
    });
};

const mapLoader = async () => {
  const users = axiosInstance
    .get<IUser[]>(Endpoints.USERS)
    .then((res) => {
      if (res.statusText === 'OK') {
        return res.data;
      }
    })
    .catch(handleError);

  const events = axiosInstance
    .get<IEvent<string>[]>(Endpoints.EVENTS)
    .then((res) => {
      if (res.statusText === 'OK') {
        return res.data;
      }
    })
    .catch(handleError);

    const data = await Promise.all([users, events]);
    return {
      users: data[0],
      events: data[1]
    }
};

const router = createBrowserRouter(
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
        <Route path="account" loader={getEvents} element={<Account />} />
        <Route path="event/create" element={<CreateEvent />} />
        <Route
          path="event/edit/:eventId"
          loader={getEvent}
          element={<CreateEvent editMode />}
        />
      </Route>
    </Route>
  )
);

function App() {
  return (
    <SnackbarProvider anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
      <RouterProvider router={router} />
      {/* <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route element={<PageLayout />}>
              <Route index element={<Hero />} />
              <Route path="login" element={<LogIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route element={<PrivateRoute />}>
                <Route path="map" element={<Home />} />
                <Route path="account" element={<Account />} />
                <Route path="event/create" element={<CreateEvent />} />
                <Route path="event/edit/:eventId" element={<CreateEvent editMode />} />
              </Route>
            </Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter> */}
    </SnackbarProvider>
  );
}

export default App;
