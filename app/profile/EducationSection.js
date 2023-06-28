import React from 'react';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddEducation from './AddEducation';
import EditEducation from './EditEducation';
import DeleteEducation from './DeleteEducation';

export default function EducationSection({ educations }) {
    const [education, setEducation] = React.useState(educations);
    const [openAddEducation, setOpenAddEducation] = React.useState(false);
    const [openEducation, setOpenEducation] = React.useState(educations.map(() => false));
    const [deleteEducation, setDeleteEducation] = React.useState(educations.map(() => false));

    React.useEffect(() => {
        setEducation(educations);
        setOpenEducation(educations.map(() => false));
        setDeleteEducation(educations.map(() => false));
    }, [educations]);

    const handleAddEducationOpen = () => {
        setOpenAddEducation(true);
    };

    const handleAddEducationClose = () => {
        setOpenAddEducation(false);
    };

    const handleEducationOpen = (index) => {
        setOpenEducation(prevState => prevState.map((value, idx) => idx === index ? true : value));
    };

    const handleEducationClose = (index) => {
        setOpenEducation(prevState => prevState.map((value, idx) => idx === index ? false : value));
    };

    const handleDeleteEducationOpen = (index) => {
        setDeleteEducation(prevState => prevState.map((value, idx) => idx === index ? true : value));
    };

    const handleDeleteEducationClose = (index) => {
        setDeleteEducation(prevState => prevState.map((value, idx) => idx === index ? false : value));
    };

    return (
        <Box id="education"
            sx={{
                pt: 2,
                width: '100%',
            }}>
            <Box sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',

            }}>
                <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                    Education
                </Typography>
                <IconButton onClick={handleAddEducationOpen}>
                    <AddIcon />
                </IconButton>
            </Box>
            <Divider />
            {education && education.map((edu, index) => (
                <Box key={index} sx={{
                    pt: 0.5,
                    position: 'relative',
                }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {edu.school}
                    </Typography>
                    <Typography color="text.secondary">
                        {edu.degree}
                    </Typography>
                    <Typography variant="body2">
                        {edu.start} - {edu.end}
                    </Typography>
                    <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                        <IconButton onClick={() => handleEducationOpen(index)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteEducationOpen(index)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <EditEducation open={openEducation[index] || false} education={education} setEducation={setEducation} index={index} handleClose={() => handleEducationClose(index)} />
                    <DeleteEducation open={deleteEducation[index] || false} education={education} setEducation={setEducation} index={index} handleClose={() => handleDeleteEducationClose(index)} />
                </Box>
            ))}
            <AddEducation open={openAddEducation} education={education} setEducation={setEducation} setOpenEducation={setOpenEducation} setDeleteEducation={setDeleteEducation} handleClose={handleAddEducationClose} />
        </Box>
    )
}
