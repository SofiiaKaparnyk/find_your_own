import React from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import { useAuth } from 'context/AuthProvider';
import Header from './Header';
import Footer from './Footer';

const innerLayout: React.CSSProperties = {
  background: 'var(--ghostBlue)',
  overflowY: 'auto',
};

export default function PageLayout() {
  const { isAuthenticated } = useAuth();

  return (
    <Layout>
      <Header />
      <Layout style={innerLayout}>
        <Layout.Content>
          <Outlet />
        </Layout.Content>
      </Layout>
      {isAuthenticated && <Footer />}
    </Layout>
  );
}
