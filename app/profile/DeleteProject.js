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

export default function DeleteProject({ open, handleClose, project, setProject, index }) {
    const projectData = project[index];

    const router = useRouter();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const handleDelete = async () => {
        const newProject = [...project];
        newProject.splice(index, 1);
        setProject(newProject);

        try {
            const res = await patchProfile({ projects: newProject });
            if (res.status === 401) {
                localStorage.removeItem('user');
                router.push('/login');
            }
        } catch (err) {
            console.error(err);
            const revertedProject = [...project];
            setProject(revertedProject);
        } finally {
            handleClose();
        }
    };

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={handleClose}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Delete Project</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to delete this project?
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
