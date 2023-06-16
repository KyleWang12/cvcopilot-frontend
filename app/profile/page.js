'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import ResponsiveHeader from '../components/ResponsiveHeader';

export default function Profile() {
    return (
        <Box sx={{
            bgcolor: '#fafafa',
        }}>
            <CssBaseline />
            <ResponsiveHeader />
            

        </Box>
    )
}
