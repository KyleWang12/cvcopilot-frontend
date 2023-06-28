import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { patchProfile } from '../utils/patchProfile';

export default function AddEducation({ open, education, setEducation, setOpenEducation, setDeleteEducation, handleClose }) {
    const [newEducation, setNewEducation] = React.useState({
        school: '',
        degree: '',
        start: '',
        end: '',
    });

    const close = () => {
        setNewEducation({
            school: '',
            degree: '',
            start: '',
            end: '',
        });
        handleClose();
    };

    const [errors, setErrors] = React.useState({
        school: false,
        degree: false,
        start: false,
        end: false,
    });

    const handleInputChange = (event) => {
        setNewEducation({
            ...newEducation,
            [event.target.name]: event.target.value,
        });
    };

    const validateField = (fieldName) => {
        return newEducation[fieldName] !== '';
    };

    const handleAddEducation = async () => {
        let newErrors = {
            school: !validateField('school'),
            degree: !validateField('degree'),
            start: !validateField('start'),
            end: !validateField('end'),
        };
    
        if (!Object.values(newErrors).some(error => error === true)) {
            const newEducationList = [...education, newEducation];
            const oldEducationList = [...education];
            setEducation(newEducationList);
    
            setOpenEducation(prevState => [...prevState, false]);
            setDeleteEducation(prevState => [...prevState, false]);
    
            try {
                const res = await patchProfile({educations: newEducationList});
                if (res.status === 401) {
                    localStorage.removeItem('user');
                    router.push('/login');
                } 
            } catch (err) {
                console.error(err);
                setEducation(oldEducationList);
                setOpenEducation(prevState => prevState.slice(0, -1));
                setDeleteEducation(prevState => prevState.slice(0, -1));
            } finally {
                close();
            }
        }
    
        setErrors(newErrors);
    };
    

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>Add Education</DialogTitle>
            <DialogContent>
                <DialogContentText>Please fill out the form below.</DialogContentText>
                <TextField
                    error={errors.school}
                    helperText={errors.school && "This field is required"}
                    autoFocus
                    margin="dense"
                    name="school"
                    label="School"
                    type="text"
                    fullWidth
                    value={newEducation.school}
                    onChange={handleInputChange}
                />
                <TextField
                    error={errors.degree}
                    helperText={errors.degree && "This field is required"}
                    margin="dense"
                    name="degree"
                    label="Degree"
                    type="text"
                    fullWidth
                    value={newEducation.degree}
                    onChange={handleInputChange}
                />
                <TextField
                    error={errors.start}
                    helperText={errors.start && "This field is required"}
                    margin="dense"
                    name="start"
                    label="Start Year"
                    type="text"
                    fullWidth
                    value={newEducation.start}
                    onChange={handleInputChange}
                />
                <TextField
                    error={errors.end}
                    helperText={errors.end && "This field is required"}
                    margin="dense"
                    name="end"
                    label="End Year"
                    type="text"
                    fullWidth
                    value={newEducation.end}
                    onChange={handleInputChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button onClick={handleAddEducation}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}

