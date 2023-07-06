import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { MuiChipsInput } from 'mui-chips-input'
import { patchProfile } from '../utils/patchProfile';

export default function AddSkill({ open, skills, setSkills, setOpenSkill, setDeleteSkill, handleClose }) {
    const [category, setCategory] = React.useState('');
    const [items, setItems] = React.useState([]);

    const close = () => {
        setCategory('');
        setItems([]);
        handleClose();
    };

    const [errors, setErrors] = React.useState({
        category: false,
        items: false,
    });

    const validateField = (fieldValue) => {
        return fieldValue !== '';
    };

    const handleAddSkill = async () => {
        let newErrors = {
            category: !validateField(category),
            items: !validateField(items),
        };

        setOpenSkill(prevState => [...prevState, false]);
        setDeleteSkill(prevState => [...prevState, false]);

        if (!Object.values(newErrors).some(error => error === true)) {
            const newSkill = { category, items };
            const newSkillList = [...skills, newSkill];
            const oldSkillList = [...skills];
            setSkills(newSkillList);
            try {
                const res = await patchProfile({ skills: newSkillList });
                if (res.status === 401) {
                    localStorage.removeItem('user');
                    router.push('/login');
                }
            } catch (err) {
                console.error(err);
                setSkills(oldSkillList);
                setOpenSkill(prevState => prevState.slice(0, -1));
                setDeleteSkill(prevState => prevState.slice(0, -1));
            } finally {
                close();
            }
        }

        setErrors(newErrors);
    };

    return (
        <Dialog open={open} onClose={close}>
            <DialogTitle>Add Skill</DialogTitle>
            <DialogContent>
                <DialogContentText>Please fill out the form below.</DialogContentText>
                <TextField
                    error={errors.category}
                    helperText={errors.category && "This field is required"}
                    autoFocus
                    margin="dense"
                    label="Skill Category"
                    type="text"
                    fullWidth
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                />
                <MuiChipsInput 
                    error={errors.items}
                    helperText={errors.items && "This field is required"}
                    margin="dense"
                    label="Skill Items"
                    fullWidth
                    value={items}
                    onChange={(chips) => setItems(chips)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={close}>Cancel</Button>
                <Button onClick={handleAddSkill}>Add</Button>
            </DialogActions>
        </Dialog>
    );
}
