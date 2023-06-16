'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { useRouter } from 'next/navigation';

const pages = ['Dashboard'];
const settings = ['Profile', 'Logout'];
const apps = ['CV-Building', 'Feedback']

export default function ResponsiveHeader() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [user, setUser] = React.useState(null);

    const router = useRouter();

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        setUser(user);
    }, []);


    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleLogin = () => {
        router.push('/login');
    };


    const handleCloseUserMenu = (event) => {
        setAnchorElUser(null);
        if (event.target.innerText === 'Logout') {
            localStorage.removeItem('user');
            setUser(null);
        } else if (event.target.innerText === 'Profile') {
            router.push('/profile');
        }
    };

    return (
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }} >
            <AppBar position="static" sx={{ backgroundColor: '#fafafa' }} elevation={0}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="a"
                            href="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                textDecoration: 'none',
                                color: '#000000',
                            }}
                        >
                            CVCopilot
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="#3b3b3b"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Typography textAlign="center">{page}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href=""
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.1rem',
                                color: '#000000',
                                textDecoration: 'none',
                            }}
                        >
                            CVCopilot
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, pt: '3px' }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    onClick={handleCloseNavMenu}
                                    sx={{ color: '#3b3b3b', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {user ?
                                <Box sx={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexDirection: 'row',
                                    pr: 1,
                                }}>
                                    <Typography variant="body"
                                        noWrap
                                        component="a"
                                        sx={{
                                            color: 'black',
                                            mr: 0.1,
                                            display: { xs: 'none', md: 'flex' }
                                        }}
                                        
                                    >
                                        {user.email}
                                    </Typography>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0, color: 'black' }}>
                                            {Boolean(anchorElUser) ?
                                                <ExpandLessIcon sx={{
                                                    fontSize: 'large',
                                                }} />
                                                :
                                                <ExpandMoreIcon sx={{
                                                    fontSize: 'large',
                                                }} />
                                            }
                                        </IconButton>
                                    </Tooltip>
                                </Box>
                                :
                                <Button
                                    onClick={handleLogin}
                                    sx={{ color: '#3b3b3b', display: 'block' }}
                                >
                                    Login
                                </Button>
                            }
                            <Menu
                                sx={{ mt: '45px' }}
                                id="menu-appbar"
                                anchorEl={anchorElUser}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorElUser)}
                                onClose={handleCloseUserMenu}
                            >
                                {settings.map((setting) => (
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </Box>
    );
}
