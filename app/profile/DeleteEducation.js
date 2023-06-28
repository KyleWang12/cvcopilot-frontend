import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import { patchProfile } from '../utils/patchProfile';
import { useRouter } from 'next/navigation';

export default function DeleteEducation({ open, handleClose, education, setEducation, index }) {
    const edu = education[index];

    const router = useRouter();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleDelete = async () => {
        const newEducation = [...education];
        newEducation.splice(index, 1);
        setEducation(newEducation);
    
        try {
            const res = await patchProfile({educations: newEducation});
            if (res.status === 401) {
                localStorage.removeItem('user');
                router.push('/login');
            } 
        } catch (err) {
            console.error(err);
            const revertedEducation = [...education];
            setEducation(revertedEducation);
        } finally {
            handleClose();
        }
    }

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Delete Education</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this education record?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} color="primary">
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
