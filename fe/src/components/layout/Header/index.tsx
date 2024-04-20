import * as React from 'react';
import { Avatar, Flex, Layout, Typography } from 'antd';
import { Link } from 'react-router-dom';
import LanguageSwitch from './LanguageSwitch';
import UserAvatar from './Avatar';
import HeaderMenu from './HeaderMenu';
import logo from '../../../assets/logo.png';

export default function Header() {
  return (
    <Layout.Header style={{ padding: '16px' }}>
      <Flex
        align="center"
        gap={16}
        justify="flex-end"
        style={{ height: '32px', color: 'var(--lightBlue)' }}
      >
        <Link
          to="/"
          style={{
            flexGrow: 1,
            marginRight: '16px',
            color: 'inherit',
            display: 'flex',
            alignItems: 'center',
            textDecoration: 'none',
          }}
        >
          <Avatar
            style={{ width: '60px', overflow: 'visible', marginRight: '8px' }}
            src={logo}
            alt="Logo"
          />
          <Typography.Title
            level={5}
            style={{
              fontFamily: 'monospace',
              fontWeight: 700,
              fontSize: '32px',
              color: 'inherit',
              margin: 0,
              backgroundImage: 'linear-gradient(#40bdff 35%, #ffdd00 65%)',
              backgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            FYO
          </Typography.Title>
        </Link>
        <LanguageSwitch />
        <UserAvatar />
        <HeaderMenu />
      </Flex>
    </Layout.Header>
  );
};
