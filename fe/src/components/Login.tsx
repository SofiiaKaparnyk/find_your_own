import React, {FormEvent, useState} from 'react';
import {Button, Container, TextField, Typography} from '@mui/material';
import mapImg from 'assets/mapb.png';
import {Link} from 'react-router-dom';

export default function LogIn() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:8000/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({email, password}),
            });

            if (response.ok) {
                // Handle successful login
                console.log('Login successful');
            } else {
                // Handle login error
                console.error('Login failed');
            }
        } catch (error) {
            console.error('An error occurred', error);
        }
    };

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
                onSubmit={handleSubmit}
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
                <Typography variant="h4">Log in</Typography>
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
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{background: 'var(--darkBlue)', mt: 2}}
                >
                    Log in
                </Button>
                <Typography variant="body2">
                    Don't have an account? <Link to="/signup">Sign up</Link>
                </Typography>
            </form>
        </Container>
    );
}
