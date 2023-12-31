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
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Server from '../config';

import { useRouter } from 'next/navigation';
import { set } from 'zod';
import Copyright from '../components/Copyright';

export default function Login() {

    const router = useRouter();

    const [rememberMe, setRememberMe] = React.useState(false);
    const [showWarning, setShowWarning] = React.useState(false);

    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [emailError, setEmailError] = React.useState(false);
    const [passwordError, setPasswordError] = React.useState(false);

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (user) {
            router.push('/');
        }
    }, []);

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleCheckboxChange = (event) => {
        setRememberMe(event.target.checked);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setEmailError(false);
        setPasswordError(false);

        if (email === "") {
            setEmailError(true);
            return;
        }

        if (password === "") {
            setPasswordError(true);
            return;
        }
        const data = new FormData(event.currentTarget);
        try {
            const response = await fetch(Server + '/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: data.get('email'),
                    password: data.get('password'),
                    rememberMe: rememberMe,
                }),
            });
            const body = await response.json();
            if (response.status !== 200) {
                setShowWarning(true);
                return;
            }
            localStorage.setItem('user', JSON.stringify(body));
            setShowWarning(false);
            router.push('/');
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Container component="main" maxWidth="xs" sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <CssBaseline />
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Log in
                </Typography>

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        error={emailError}
                        helperText={emailError ? "Email is required" : ""}
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleEmailChange}
                        value={email}
                    />
                    <TextField
                        error={passwordError}
                        helperText={passwordError ? "Password is required" : ""}
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handlePasswordChange}
                        value={password}
                    />
                    <FormControlLabel
                        control={<Checkbox checked={rememberMe} onChange={handleCheckboxChange} color="primary" />}
                        label="Remember me"
                    />
                    <Collapse in={showWarning} sx={{
                        mt: 2,
                    }}>
                        <Alert severity="error">
                            Invalid email or password.
                        </Alert>
                    </Collapse>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Log In
                    </Button>
                    <Grid container>
                        <Grid item xs>
                            {/* <Link href="#" variant="body2">
                                Forgot password?
                            </Link> */}
                        </Grid>
                        <Grid item>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
    );
}