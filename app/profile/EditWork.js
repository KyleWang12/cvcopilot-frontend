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

export default function EditWork({ open, handleClose, work, setWork, index }) {
    const job = work[index];

    const [title, setTitle] = React.useState(job.title);
    const [company, setCompany] = React.useState(job.company);
    const [type, setType] = React.useState(job.type);
    const [start, setStart] = React.useState(job.startDate);
    const [end, setEnd] = React.useState(job.endDate);
    const [description, setDescription] = React.useState(job.description);
    const [hasChanged, setHasChanged] = React.useState(false);

    const router = useRouter();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    React.useEffect(() => {
        setHasChanged(title !== job.title || company !== job.company || type !== job.type || start !== job.startDate || end !== job.endDate || description !== job.description);
    }, [title, company, type, start, end, description, job]);

    const handleSave = async () => {
        const newJob = {
            title: title,
            company: company,
            type: type,
            startDate: start,
            endDate: end,
            description: description
        }
        const newWork = [...work];
        const oldWork = [...work];
        newWork[index] = newJob;
        setWork(newWork);

        try {
            const res = await patchProfile({ workExperiences: newWork });
            if (res.status === 401) {
                localStorage.removeItem('user');
                router.push('/login');
            }
        } catch (err) {
            console.error(err);
            setWork(oldWork);
        } finally {
            handleClose();
        }
    }

    const close = () => {
        setTitle(job.title);
        setCompany(job.company);
        setType(job.type);
        setStart(job.startDate);
        setEnd(job.endDate);
        setDescription(job.description);
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
                <DialogTitle id="form-dialog-title">Edit Work Experience</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Job Title"
                        type="text"
                        fullWidth
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Company"
                        type="text"
                        fullWidth
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Job Type"
                        type="text"
                        fullWidth
                        value={type}
                        onChange={(e) => setType(e.target.value)}
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
