import React from 'react';
import { Box, Typography, Divider, IconButton, Chip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddSkill from './AddSkill';
import EditSkill from './EditSkill';
import DeleteSkill from './DeleteSkill';

export default function SkillSection({ skills }) {
    const [skillList, setSkillList] = React.useState(skills);
    const [openAddSkill, setOpenAddSkill] = React.useState(false);
    const [openSkill, setOpenSkill] = React.useState(skills.map(() => false));
    const [deleteSkill, setDeleteSkill] = React.useState(skills.map(() => false));

    React.useEffect(() => {
        setSkillList(skills);
        setOpenSkill(skills.map(() => false));
        setDeleteSkill(skills.map(() => false));
    }, [skills]);

    const handleAddSkillOpen = () => {
        setOpenAddSkill(true);
    };

    const handleAddSkillClose = () => {
        setOpenAddSkill(false);
    };

    const handleSkillOpen = (index) => {
        setOpenSkill(prevState => prevState.map((value, idx) => idx === index ? true : value));
    };

    const handleSkillClose = (index) => {
        setOpenSkill(prevState => prevState.map((value, idx) => idx === index ? false : value));
    };

    const handleDeleteSkillOpen = (index) => {
        setDeleteSkill(prevState => prevState.map((value, idx) => idx === index ? true : value));
    };

    const handleDeleteSkillClose = (index) => {
        setDeleteSkill(prevState => prevState.map((value, idx) => idx === index ? false : value));
    };

    return (
        <Box id="skills"
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
                    Skills
                </Typography>
                <IconButton onClick={handleAddSkillOpen}>
                    <AddIcon />
                </IconButton>
            </Box>
            <Divider sx={{mb: 0.5}}/>
            {skillList && skillList.map((skillCat, index) => (
                <Box key={index} sx={{ pt: 0.5, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '3px', maxWidth: '85%' }}>
                        <Typography variant="h7" component="div" sx={{ fontWeight: 'bold' }}>
                            {skillCat.category}:
                        </Typography>
                        {skillCat.items.map((item, idx) => (
                            <Chip key={idx} label={item} variant="outlined" size="small" />
                        ))}
                    </Box>
                    <Box sx={{ ml: 'auto', display: 'flex', flexWrap: 'nowrap' }}>
                        <IconButton onClick={() => handleSkillOpen(index)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteSkillOpen(index)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <EditSkill open={openSkill[index] || false} skills={skillList} setSkills={setSkillList} index={index} handleClose={() => handleSkillClose(index)} />
                    <DeleteSkill open={deleteSkill[index] || false} skills={skillList} setSkills={setSkillList} index={index} handleClose={() => handleDeleteSkillClose(index)} />
                </Box>
            ))}



            <AddSkill open={openAddSkill} skills={skillList} setSkills={setSkillList} setOpenSkill={setOpenSkill} setDeleteSkill={setDeleteSkill} handleClose={handleAddSkillClose} />
        </Box>
    )
}
