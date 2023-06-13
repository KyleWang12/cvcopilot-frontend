'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import FormHelperText from '@mui/material/FormHelperText';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';
import Server from '../config';

import { useRouter } from 'next/navigation'

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                CVCopilot
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default function SignUp() {

    const router = useRouter();

    const [password, setPassword] = React.useState('');
    const [confirmPassword, setConfirmPassword] = React.useState('');
    const [isError, setIsError] = React.useState(false);
    const [showWarning, setShowWarning] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const [email, setEmail] = React.useState('');
    const [isEmailEmpty, setIsEmailEmpty] = React.useState(false);
    const [isPasswordEmpty, setIsPasswordEmpty] = React.useState(false);
    const [emailError, setEmailError] = React.useState('');
    const [passwordError, setPasswordError] = React.useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        const emailCheck = /\S+@\S+\.\S+/;
        if (email === '' || password === '' || !emailCheck.test(email) || email.length > 50 || password.length < 6 || password.length > 40) {
            setIsEmailEmpty(email === '');
            setIsPasswordEmpty(password === '');
            setEmailError(!emailCheck.test(email) ? 'Invalid email format' : (email.length > 50 ? 'Email can be a maximum of 50 characters' : ''));
            setPasswordError(password.length < 6 ? 'Password must be at least 6 characters' : (password.length > 40 ? 'Password can be a maximum of 40 characters' : ''));
            return;
        }
        if (password !== confirmPassword) {
            setIsError(true);
            return;
        }
        const data = new FormData(event.currentTarget);
        const response = await fetch(Server + '/api/auth/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email: data.get('email'),
                password: data.get('password'),
            }),
        });
        console.log(response);
        if (response.status !== 200) {
            const body = await response.json();
            setShowWarning(true);
            setErrorMessage(body.message);
            return;
        }
        router.push('/login');
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                error={isEmailEmpty || emailError !== ''}
                                helperText={emailError}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                    setIsEmailEmpty(false);
                                    setEmailError('');
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                autoComplete="new-password"
                                error={isPasswordEmpty || passwordError !== ''}
                                helperText={passwordError}
                                onChange={(e) => {
                                    setPassword(e.target.value);
                                    setIsPasswordEmpty(false);
                                    setPasswordError('');
                                }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="confirmPassword"
                                label="Confirm Password"
                                type="password"
                                id="confirmPassword"
                                autoComplete="new-password"
                                error={isError}
                                onChange={(e) => {
                                    setConfirmPassword(e.target.value);
                                    setIsError(false);
                                }}
                            />
                            {isError && <FormHelperText error>Passwords don't match</FormHelperText>}
                        </Grid>
                    </Grid>
                    <Collapse in={showWarning} sx={{
                        mt: 2,
                    }}>
                        <Alert severity="error">
                            {errorMessage}
                        </Alert>
                    </Collapse>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up For Free
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Log in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 5 }} />
        </Container>
    );
}