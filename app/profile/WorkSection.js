import React from 'react';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddWork from './AddWork';
import EditWork from './EditWork';
import DeleteWork from './DeleteWork';

export default function WorkSection({ workExperience }) {
    const [work, setWork] = React.useState(workExperience);
    const [openAddWork, setOpenAddWork] = React.useState(false);
    const [openWork, setOpenWork] = React.useState(workExperience.map(() => false));
    const [deleteWork, setDeleteWork] = React.useState(workExperience.map(() => false));

    React.useEffect(() => {
        setWork(workExperience);
        setOpenWork(workExperience.map(() => false));
        setDeleteWork(workExperience.map(() => false));
    }, [workExperience]);

    const handleAddWorkOpen = () => {
        setOpenAddWork(true);
    };

    const handleAddWorkClose = () => {
        setOpenAddWork(false);
    };

    const handleWorkOpen = (index) => {
        setOpenWork(prevState => prevState.map((value, idx) => idx === index ? true : value));
    };

    const handleWorkClose = (index) => {
        setOpenWork(prevState => prevState.map((value, idx) => idx === index ? false : value));
    };

    const handleDeleteWorkOpen = (index) => {
        setDeleteWork(prevState => prevState.map((value, idx) => idx === index ? true : value));
    };

    const handleDeleteWorkClose = (index) => {
        setDeleteWork(prevState => prevState.map((value, idx) => idx === index ? false : value));
    };

    return (
        <Box id="work"
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
                    Work Experience
                </Typography>
                <IconButton onClick={handleAddWorkOpen}>
                    <AddIcon />
                </IconButton>
            </Box>
            <Divider />
            {work && work.map((workExp, index) => (
                <Box key={index} sx={{
                    pt: 0.5,
                    position: 'relative',
                }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {workExp.title}
                    </Typography>
                    <Typography variant="body2">
                        {workExp.company} • {workExp.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {workExp.startDate} - {workExp.endDate}
                    </Typography>
                    <Typography variant="body2">
                        {workExp.description}
                    </Typography>
                    <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                        <IconButton onClick={() => handleWorkOpen(index)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteWorkOpen(index)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <EditWork open={openWork[index] || false} work={work} setWork={setWork} index={index} handleClose={() => handleWorkClose(index)} />
                    <DeleteWork open={deleteWork[index] || false} work={work} setWork={setWork} index={index} handleClose={() => handleDeleteWorkClose(index)} />
                </Box>
            ))}
            <AddWork open={openAddWork} work={work} setWork={setWork} setOpenWork={setOpenWork} setDeleteWork={setDeleteWork} handleClose={handleAddWorkClose} />
        </Box>
    )
}
