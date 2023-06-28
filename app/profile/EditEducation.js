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


export default function EditEducation({ open, handleClose, education, setEducation, index }) {

    const edu = education[index];

    const [school, setSchool] = React.useState(edu.school);
    const [degree, setDegree] = React.useState(edu.degree);
    const [start, setStart] = React.useState(edu.start);
    const [end, setEnd] = React.useState(edu.end);
    const [hasChanged, setHasChanged] = React.useState(false);

    const router = useRouter();

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    React.useEffect(() => {
        setHasChanged(school !== edu.school || degree !== edu.degree || start !== edu.start || end !== edu.end);
    }, [school, degree, start, end, edu]);

    const handleSave = async () => {
        const newEdu = {
            school: school,
            degree: degree,
            start: start,
            end: end
        }
        const newEducation = [...education];
        const oldEducation = [...education];
        newEducation[index] = newEdu;
        setEducation(newEducation);
    
        try {
            const res = await patchProfile({educations: newEducation});
            if (res.status === 401) {
                localStorage.removeItem('user');
                router.push('/login');
            } 
        } catch (err) {
            console.error(err);
            setEducation(oldEducation);
        } finally {
            handleClose();
        }
    }

    const close = () => {
        setSchool(edu.school);
        setDegree(edu.degree);
        setStart(edu.start);
        setEnd(edu.end);
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
                <DialogTitle id="form-dialog-title">Edit Education</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="School"
                        type="text"
                        fullWidth
                        value={school}
                        onChange={(e) => setSchool(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Degree"
                        type="text"
                        fullWidth
                        value={degree}
                        onChange={(e) => setDegree(e.target.value)}
                    />
                    <TextField
                        margin="dense"
                        label="Start"
                        type="number"
                        fullWidth
                        value={start}
                        onChange={(e) => setStart(e.target.value)}
                        inputProps={{ min: "1900", step: "1" }}
                    />
                    <TextField
                        margin="dense"
                        label="End"
                        type="number"
                        fullWidth
                        value={end}
                        onChange={(e) => setEnd(e.target.value)}
                        inputProps={{ min: "1900", step: "1" }}
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