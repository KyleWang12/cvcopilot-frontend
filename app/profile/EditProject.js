import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import useMediaQuery from '@mui/material/useMediaQuery';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import { patchProfile } from '../utils/patchProfile';
import { useRouter } from 'next/navigation';

export default function EditProject({ open, handleClose, project, setProject, index }) {
    const proj = project[index];

    const [title, setTitle] = React.useState(proj.title);
    const [description, setDescription] = React.useState(proj.description);
    const [start, setStart] = React.useState(proj.startDate);
    const [end, setEnd] = React.useState(proj.endDate);
    const [hasChanged, setHasChanged] = React.useState(false);

    const router = useRouter();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    React.useEffect(() => {
        setHasChanged(title !== proj.title || start !== proj.startDate || end !== proj.endDate || description !== proj.description);
    }, [title, start, end, description, proj]);

    const handleSave = async () => {
        const newProj = {
            title: title,
            startDate: start,
            endDate: end,
            description: description
        }
        const newProjects = [...project];
        const oldProjects = [...project];
        newProjects[index] = newProj;
        setProject(newProjects);

        try {
            const res = await patchProfile({ projects: newProjects });
            if (res.status === 401) {
                localStorage.removeItem('user');
                router.push('/login');
            }
        } catch (err) {
            console.error(err);
            setProject(oldProjects);
        } finally {
            handleClose();
        }
    }

    const close = () => {
        setTitle(proj.title);
        setStart(proj.startDate);
        setEnd(proj.endDate);
        setDescription(proj.description);
        handleClose();
    }

    return (
        <div>
            <Dialog
                fullScreen={fullScreen}
                open={open}
                onClose={close}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Edit Project</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Project Title"
                        type="text"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Start Date"
                        type="date"
                        fullWidth
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        margin="dense"
                        label="End Date"
                        type="date"
                        fullWidth
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                        InputLabelProps={{ shrink: true }}
                    />
                    <TextField
                        margin="dense"
                        label="Description"
                        multiline
                        maxRows={4}
                        fullWidth
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={close} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleSave} color="primary" disabled={!hasChanged}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
