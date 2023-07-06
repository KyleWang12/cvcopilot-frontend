'use client';
import React from 'react';
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
// import ChipInput from 'mui-chips-input'
import { MuiChipsInput } from 'mui-chips-input'

export default function EditSkill({ open, handleClose, skills, setSkills, index }) {
    const skillCat = skills[index];

    const [category, setCategory] = React.useState(skillCat.category);
    const [items, setItems] = React.useState(skillCat.items);
    const [hasChanged, setHasChanged] = React.useState(false);

    const router = useRouter();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    React.useEffect(() => {
        setHasChanged(category !== skillCat.category || JSON.stringify(items) !== JSON.stringify(skillCat.items));
    }, [category, items, skillCat]);

    const handleSave = async () => {
        const newSkill = {
            category: category,
            items: items
        }
        const newSkills = [...skills];
        const oldSkills = [...skills];
        newSkills[index] = newSkill;
        setSkills(newSkills);

        try {
            const res = await patchProfile({ skills: newSkills });
            if (res.status === 401) {
                localStorage.removeItem('user');
                router.push('/login');
            }
        } catch (err) {
            console.error(err);
            setSkills(oldSkills);
        } finally {
            handleClose();
        }
    }

    const close = () => {
        setCategory(skillCat.category);
        setItems(skillCat.items);
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
                <DialogTitle id="form-dialog-title">Edit Skill</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Skill Category"
                        type="text"
                        fullWidth
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    />
                    <MuiChipsInput 
                        margin="dense"
                        label="Skill Items"
                        fullWidth
                        value={items}
                        onChange={(chips)=>{setItems(chips)}}
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
