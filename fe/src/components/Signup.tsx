import React, { useState } from 'react';
import { Button, Container, TextField, Typography } from '@mui/material';
import mapImg from 'assets/mapb.png';
import { Link } from 'react-router-dom';

export default function SignUp() {
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: 'grid',
        placeItems: 'center',
        position: 'relative',
        width: '100%',
        height: '100%',
        padding: 3,
        background: {
          xs: `
            linear-gradient(0deg, transparent 0%, #22346a 100%),
            url(${mapImg}) left bottom / cover no-repeat
          `,
          md: `
            linear-gradient(0deg, transparent 0%, #22346a 100%),
            url(${mapImg}) left bottom / cover no-repeat
          `,
        },
      }}
    >
      <form
        style={{
          background: 'white',
          color: 'var(--darkBlue)',
          width: '400px',
          borderRadius: '20px',
          padding: '36px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <Typography variant="h4">Create your account</Typography>
        <TextField
          size="small"
          id="name-input"
          label="First name"
          type="text"
          value={name}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setName(event.target.value);
          }}
        />
        <TextField
          size="small"
          id="last-name-input"
          label="Last name"
          type="text"
          value={lastname}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setLastname(event.target.value);
          }}
        />
        <TextField
          size="small"
          id="email-input"
          fullWidth
          label="Email"
          type="email"
          value={email}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setEmail(event.target.value);
          }}
        />
        <TextField
          size="small"
          id="password-input"
          fullWidth
          label="Password"
          type="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        />
        <TextField
          size="small"
          id="confirm-password-input"
          fullWidth
          label="Confirm password"
          type="password"
          value={password}
          onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
            setPassword(event.target.value);
          }}
        />
        <Button
          fullWidth
          variant="contained"
          sx={{ background: 'var(--darkBlue)', mt: 2 }}
        >
          Submit
        </Button>
        <Typography variant="body2">
          Already have an account? <Link to="/login">Log in</Link>
        </Typography>
      </form>
    </Container>
  );
}
