import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import BackdropLoading from 'components/Backdrop';
import { useLoading } from 'context/LoadingContext';

export default function PageLayout() {
  const { isLoading } = useLoading();
  return (
    <>
      <Header />
      <Outlet />
      <BackdropLoading loading={isLoading} />
    </>
  );
}
