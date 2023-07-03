import React from 'react';
import { Box, Typography, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import AddProject from './AddProject';
import EditProject from './EditProject';
import DeleteProject from './DeleteProject';

export default function ProjectSection({ projects }) {
    const [project, setProject] = React.useState(projects);
    const [openAddProject, setOpenAddProject] = React.useState(false);
    const [openProject, setOpenProject] = React.useState(projects.map(() => false));
    const [deleteProject, setDeleteProject] = React.useState(projects.map(() => false));

    React.useEffect(() => {
        setProject(projects);
        setOpenProject(projects.map(() => false));
        setDeleteProject(projects.map(() => false));
    }, [projects]);

    const handleAddProjectOpen = () => {
        setOpenAddProject(true);
    };

    const handleAddProjectClose = () => {
        setOpenAddProject(false);
    };

    const handleProjectOpen = (index) => {
        setOpenProject(prevState => prevState.map((value, idx) => idx === index ? true : value));
    };

    const handleProjectClose = (index) => {
        setOpenProject(prevState => prevState.map((value, idx) => idx === index ? false : value));
    };

    const handleDeleteProjectOpen = (index) => {
        setDeleteProject(prevState => prevState.map((value, idx) => idx === index ? true : value));
    };

    const handleDeleteProjectClose = (index) => {
        setDeleteProject(prevState => prevState.map((value, idx) => idx === index ? false : value));
    };

    return (
        <Box id="projects"
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
                    Projects
                </Typography>
                <IconButton onClick={handleAddProjectOpen}>
                    <AddIcon />
                </IconButton>
            </Box>
            <Divider />
            {project && project.map((proj, index) => (
                <Box key={index} sx={{
                    pt: 0.5,
                    position: 'relative',
                }}>
                    <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                        {proj.title}
                    </Typography>
                    <Typography variant="body2">
                        {proj.startDate} - {proj.endDate}
                    </Typography>
                    <Typography variant="body2">
                        {proj.description}
                    </Typography>
                    <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                        <IconButton onClick={() => handleProjectOpen(index)}>
                            <EditIcon fontSize="small" />
                        </IconButton>
                        <IconButton onClick={() => handleDeleteProjectOpen(index)}>
                            <DeleteIcon fontSize="small" />
                        </IconButton>
                    </Box>
                    <EditProject open={openProject[index] || false} project={project} setProject={setProject} index={index} handleClose={() => handleProjectClose(index)} />
                    <DeleteProject open={deleteProject[index] || false} project={project} setProject={setProject} index={index} handleClose={() => handleDeleteProjectClose(index)} />
                </Box>
            ))}
            <AddProject open={openAddProject} project={project} setProject={setProject} setOpenProject={setOpenProject} setDeleteProject={setDeleteProject} handleClose={handleAddProjectClose} />
        </Box>
    )
}
