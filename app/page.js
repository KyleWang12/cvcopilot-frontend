'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ResponsiveHeader from './components/ResponsiveHeader';
import { useRouter } from 'next/navigation';

export default function Home() {

    const router = useRouter();

    React.useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'));
        if (!user) {
            router.push('/login');
        }
    }, []);

    return (
        <Box sx={{
            bgcolor: '#fafafa',
        }}>
            <CssBaseline />
            <ResponsiveHeader />
            
  
        </Box>
    )
}
