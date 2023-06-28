import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { patchProfile } from '../utils/patchProfile';

export default function AddWork({ open, work, setWork, setOpenWork, setDeleteWork, handleClose }) {
    const [newWork, setNewWork] = React.useState({
        title: '',
        company: '',
        type: '',
        startDate: '',
        endDate: '',
        description: '',
    });

    const close = () => {
        setNewWork({
            title: '',
            company: '',
            type: '',
            startDate: '',
            endDate: '',
            description: '',
        });
        handleClose();
    };

    const [errors, setErrors] = React.useState({
        title: false,
        company: false,
        type: false,
        startDate: false,
        endDate: false,
        description: false,
    });

    const handleInputChange = (event) => {
        setNewWork({
            ...newWork,
            [event.target.name]: event.target.value,
        });
    };

    const validateField = (fieldName) => {
        return newWork[fieldName] !== '';
    };

    const handleAddWork = async () => {
        let newErrors = {
            title: !validateField('title'),
            company: !validateField('company'),
            type: !validateField('type'),
            startDate: !validateField('startDate'),
            endDate: !validateField('endDate'),
            description: !validateField('description'),
        };

        setOpenWork(prevState => [...prevState, false]);
        setDeleteWork(prevState => [...prevState, false]);

        if (!Object.values(newErrors).some(error => error === true)) {
            const newWorkList = [...work, newWork];
            const oldWorkList = [...work];
            setWork(newWorkList);
            try {
                const res = await patchProfile({ workExperiences: newWorkList });
                if (res.status === 401) {
                    localStorage.removeItem('user');
                    router.push('/login');
                }
            } catch (err) {
                console.error(err);
                setWork(oldWorkList);
                setOpenWork(prevState => prevState.slice(0, -1));
                setDeleteWork(prevState => prevState.slice(0, -1));
            } finally {
                close();
            }
        }

        setErrors(newErrors);
    };

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>Add Work</DialogTitle>
            <DialogContent>
                <DialogContentText>Please fill out the form below.</DialogContentText>
                <TextField
                    error={errors.title}
                    helperText={errors.title && "This field is required"}
                    autoFocus
                    margin="dense"
                    name="title"
                    label="Job Title"
                    type="text"
                    fullWidth
                    value={newWork.title}
                    onChange={handleInputChange}
                />
                <TextField
                    error={errors.company}
                    helperText={errors.company && "This field is required"}
                    margin="dense"
                    name="company"
                    label="Company"
                    type="text"
                    fullWidth
                    value={newWork.company}
                    onChange={handleInputChange}
                />
                <TextField
                    error={errors.type}
                    helperText={errors.type && "This field is required"}
                    margin="dense"
                    name="type"
                    label="Job Type"
                    type="text"
                    fullWidth
                    value={newWork.type}
                    onChange={handleInputChange}
                />
                <TextField
                    error={errors.start}
                    helperText={errors.start && "This field is required"}
                    margin="dense"
                    name="startDate"
                    label="Start Date"
                    type="date"
                    fullWidth
                    value={newWork.start}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    error={errors.end}
                    helperText={errors.end && "This field is required"}
                    margin="dense"
                    name="endDate"
                    label="End Date"
                    type="date"
                    fullWidth
                    value={newWork.end}
                    onChange={handleInputChange}
                    InputLabelProps={{ shrink: true }}
                />
                <TextField
                    error={errors.description}
                    helperText={errors.description && "This field is required"}
                    margin="dense"
                    name="description"
                    label="Description"
                    multiline
                    maxRows={4}
                    fullWidth
                    value={newWork.description}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button onClick={handleAddWork}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}
