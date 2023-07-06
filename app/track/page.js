'use client';
import React from 'react';
import { Box, CssBaseline, Card, CardContent, CardActions, Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ListSubheader from '@mui/material/ListSubheader';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import DraftsIcon from '@mui/icons-material/Drafts';
import SendIcon from '@mui/icons-material/Send';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import StarBorder from '@mui/icons-material/StarBorder';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import IconButton from '@mui/material/IconButton';
import RefreshIcon from '@mui/icons-material/Refresh';
import useMediaQuery from '@mui/material/useMediaQuery';

import { useTheme } from '@mui/material/styles';

import ResponsiveHeader from '../components/ResponsiveHeader';
import { useRouter } from 'next/navigation';


const taskList = [
    {
        name: 'Software Engineer',
        createdAt: '2021-07-16T19:20+01:00',
        status: 'In Progress',
    },
    {
        name: 'Software Engineer',
        createdAt: '2020-07-16T19:20+01:00',
        status: 'In Progress',
    },
    {
        name: 'Software Engineer',
        createdAt: '2019-07-16T19:20+01:00',
        status: 'In Progress',
    },
    {
        name: 'Software Engineer',
        createdAt: '2018-07-16T19:20+01:00',
        status: 'Finished',
    },
    {
        name: 'Software Engineer',
        createdAt: '2018-07-15T19:20+01:00',
        status: 'Finished',
    },
]

export default function Track() {

    const [page, setPage] = React.useState(1);
    const handleChange = (event, value) => {
        setPage(value);
    };

    const refreshData = () => {
        setPage(1);
        // Add your logic here to refresh your data
    }

    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box>
            <CssBaseline />
            <ResponsiveHeader />
            <Box sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
            }}>

                <Card variant="outlined" sx={{ width: ['90%', '50%'], position: 'relative' }}>
                    <IconButton
                        aria-label="refresh data"
                        component="span"
                        sx={{ position: 'absolute', top: 20, right: 25 }} // Position it absolutely
                        onClick={refreshData}
                    >
                        <RefreshIcon />
                    </IconButton>
                    <Typography gutterBottom variant="h5" component="div" sx={{ pt: 3, pl: 2 }}>
                        Task List
                    </Typography>
                    <List
                        sx={{ width: '100%' }}
                        component="nav"
                        aria-labelledby="nested-list-subheader"
                    >
                        {taskList.map((task, index) => (
                            <ListItem key={index} sx={{ pr: 0 }}>
                                <ListItemText primary={task.name} />
                                <ListItemText secondary={task.createdAt} />
                                <ListItemIcon sx={{
                                    color: task.status === 'In Progress' ? 'orange' : 'green',
                                }}>
                                    {task.status === 'In Progress' ? <HourglassBottomIcon /> : <CheckCircleOutlineIcon />}
                                </ListItemIcon >
                            </ListItem>
                        ))}
                    </List>
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',
                        pb: 2,
                    }}>
                        <Stack spacing={2}>
                            <Pagination count={10} page={page} onChange={handleChange} showFirstButton={!isMobile} showLastButton={!isMobile} />                        </Stack>
                    </Box>
                </Card>
            </Box>
        </Box>
    )
}
