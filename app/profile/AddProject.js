import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { patchProfile } from '../utils/patchProfile';

export default function AddProject({ open, project, setProject, setOpenProject, setDeleteProject, handleClose }) {
    const [newProject, setNewProject] = React.useState({
        title: '',
        startDate: '',
        endDate: '',
        description: '',
    });

    const close = () => {
        setNewProject({
            title: '',
            startDate: '',
            endDate: '',
            description: '',
        });
        handleClose();
    };

    const [errors, setErrors] = React.useState({
        title: false,
        startDate: false,
        endDate: false,
        description: false,
    });

    const handleInputChange = (event) => {
        setNewProject({
            ...newProject,
            [event.target.name]: event.target.value,
        });
    };

    const validateField = (fieldName) => {
        return newProject[fieldName] !== '';
    };

    const handleAddProject = async () => {
        let newErrors = {
            title: !validateField('title'),
            startDate: !validateField('startDate'),
            endDate: !validateField('endDate'),
            description: !validateField('description'),
        };

        setOpenProject(prevState => [...prevState, false]);
        setDeleteProject(prevState => [...prevState, false]);

        if (!Object.values(newErrors).some(error => error === true)) {
            const newProjectList = [...project, newProject];
            const oldProjectList = [...project];
            setProject(newProjectList);
            try {
                const res = await patchProfile({ projects: newProjectList });
                if (res.status === 401) {
                    localStorage.removeItem('user');
                    router.push('/login');
                }
            } catch (err) {
                console.error(err);
                setProject(oldProjectList);
                setOpenProject(prevState => prevState.slice(0, -1));
                setDeleteProject(prevState => prevState.slice(0, -1));
            } finally {
                close();
            }
        }

        setErrors(newErrors);
    };

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>Add Project</DialogTitle>
            <DialogContent>
                <DialogContentText>Please fill out the form below.</DialogContentText>
                <TextField
                    error={errors.title}
                    helperText={errors.title && "This field is required"}
                    autoFocus
                    margin="dense"
                    name="title"
                    label="Project Title"
                    type="text"
                    fullWidth
                    value={newProject.title}
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
                    value={newProject.start}
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
                    value={newProject.end}
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
                    value={newProject.description}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button onClick={handleAddProject}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}
