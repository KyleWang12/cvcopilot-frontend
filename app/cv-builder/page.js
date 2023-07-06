'use client';
import React from 'react';
import { Box, CssBaseline, Card, CardContent, CardActions, Button, Typography, TextField, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ResponsiveHeader from '../components/ResponsiveHeader';
import { useRouter } from 'next/navigation';

export default function CVBuilder() {
    const router = useRouter();

    const [description, setDescription] = React.useState("");
    const [open, setOpen] = React.useState(false);

    const handleSubmit = () => {
        // TODO send description to backend
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleTrack = () => {
        // TODO redirect to track page
        setOpen(false);
    }

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
                <Card variant="outlined" sx={{ width: ['90%', '50%'] }}>
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">
                            Paste the job description here
                        </Typography>
                        <TextField
                            margin="dense"
                            label="job description"
                            multiline
                            maxRows={15}
                            fullWidth
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </CardContent>
                    <CardActions sx={{ justifyContent: 'center', pb: 2 }}>
                        <Button variant="outlined" endIcon={<ArrowForwardIcon />} onClick={handleSubmit}>
                            Generate CV
                        </Button>
                    </CardActions>
                </Card>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>Task is in queue!</DialogTitle>
                    <DialogActions>
                        <Button onClick={handleTrack}>
                            Track Progress
                        </Button>
                        <Button onClick={handleClose}>
                            OK
                        </Button>
                    </DialogActions>
                </Dialog>
            </Box>
        </Box>
    )
}
