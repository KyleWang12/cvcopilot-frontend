'use client';

import React from 'react';
import { Box, CssBaseline, Typography, Divider, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import { useRouter } from 'next/navigation';
import ResponsiveHeader from '../components/ResponsiveHeader';
import { getProfile } from '../utils/getProfile';
import EditEducation from './EditEducation';
import DeleteEducation from './DeleteEducation';
import AddEducation from './AddEducation';
import EditWork from './EditWork';
import DeleteWork from './DeleteWork';
import AddWork from './AddWork';
import EditProject from './EditProject';
import DeleteProject from './DeleteProject';
import AddProject from './AddProject';

export default function Profile() {

    const router = useRouter();
    const [profile, setProfile] = React.useState(null);
    const [skill, setSkill] = React.useState(null);
    const [link, setLink] = React.useState(null);

    const [education, setEducation] = React.useState(null);
    const [openAddEducation, setOpenAddEducation] = React.useState(false);
    const [openEducation, setOpenEducation] = React.useState([]);
    const [deleteEducation, setDeleteEducation] = React.useState([]);

    const [workExperience, setWorkExperience] = React.useState(null);
    const [openAddWork, setOpenAddWork] = React.useState(false);
    const [openWork, setOpenWork] = React.useState([]);
    const [deleteWork, setDeleteWork] = React.useState([]);

    const [projects, setProjects] = React.useState(null);
    const [openAddProject, setOpenAddProject] = React.useState(false);
    const [openProject, setOpenProject] = React.useState([]);
    const [deleteProject, setDeleteProject] = React.useState([]);

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

    const getYear = (dateString) => {
        const date = new Date(dateString);
        return date.getFullYear();
    };

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
    React.useEffect(() => {
        async function getProfileData() {
            const profile = await getProfile();
            if (!profile) {
                localStorage.removeItem('user');
                router.push('/login');
                return;
            }
            setProfile(profile);
            setEducation(profile.educations);
            setWorkExperience(profile.workExperiences);
            setSkill(profile.skills);
            setLink(profile.links);
            setOpenEducation(profile.educations.map(() => false));
            setDeleteEducation(profile.educations.map(() => false));
            setOpenWork(profile.workExperiences.map(() => false));
            setDeleteWork(profile.workExperiences.map(() => false));
            setProjects(profile.projects);
            setOpenProject(profile.projects.map(() => false));
            setDeleteProject(profile.projects.map(() => false));
        }
        getProfileData();
    }, []);

    return (
        <Box>
            {profile &&
                <Box sx={{
                    bgcolor: '#fafafa',
                    overflow: 'auto',
                    minHeight: '100vh',
                    mb: 2,
                }}>
                    <CssBaseline />
                    <ResponsiveHeader />
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        flexDirection: 'column',
                        pt: 8,
                    }}>
                        <Box sx={{
                            width: ['90%', '50%'],
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            flexDirection: 'row',
                        }}>
                            {/* <NavigationBox /> */}
                            <Box sx={{
                                flexGrow: 2,
                            }}>
                                <Box id="education"
                                    sx={{
                                        pt: 2,
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
                                </Box>
                                <AddEducation open={openAddEducation} education={education} setEducation={setEducation} setOpenEducation={setOpenEducation} setDeleteEducation={setDeleteEducation} handleClose={handleAddEducationClose} />
                                <Box id="work" sx={{ pt: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                            Work Experience
                                        </Typography>
                                        <IconButton onClick={handleAddWorkOpen}>
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                    <Divider />
                                    {workExperience && workExperience.map((work, index) => (
                                        <Box key={index} sx={{ pt: 0.5, position: 'relative' }}>
                                            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                                {work.title}
                                            </Typography>
                                            <Typography variant="body2">
                                                {work.company} • {work.type}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {getYear(work.startDate)} - {getYear(work.endDate)}
                                            </Typography>
                                            <Typography variant="body2">
                                                {work.description}
                                            </Typography>
                                            <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                                                <IconButton onClick={() => handleWorkOpen(index)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteWorkOpen(index)}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                            <EditWork open={openWork[index] || false} work={workExperience} setWork={setWorkExperience} index={index} handleClose={() => handleWorkClose(index)} />
                                            <DeleteWork open={deleteWork[index] || false} work={workExperience} setWork={setWorkExperience} index={index} handleClose={() => handleDeleteWorkClose(index)} />
                                        </Box>
                                    ))}
                                    <AddWork open={openAddWork} work={workExperience} setWork={setWorkExperience} setOpenWork={setOpenWork} setDeleteWork={setDeleteWork} handleClose={handleAddWorkClose} />
                                </Box>
                                <Box id="projects" sx={{ pt: 2 }}>
                                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                            Projects
                                        </Typography>
                                        <IconButton onClick={handleAddProjectOpen}>
                                            <AddIcon />
                                        </IconButton>
                                    </Box>
                                    <Divider />
                                    {projects && projects.map((project, index) => (
                                        <Box key={index} sx={{ pt: 0.5, position: 'relative' }}>
                                            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
                                                {project.title}
                                            </Typography>
                                            <Typography variant="body2" color="text.secondary">
                                                {getYear(project.startDate)} - {getYear(project.endDate)}
                                            </Typography>
                                            <Typography variant="body2">
                                                {project.description}
                                            </Typography>
                                            <Box sx={{ position: 'absolute', top: 0, right: 0 }}>
                                                <IconButton onClick={() => handleProjectOpen(index)}>
                                                    <EditIcon fontSize="small" />
                                                </IconButton>
                                                <IconButton onClick={() => handleDeleteProjectOpen(index)}>
                                                    <DeleteIcon fontSize="small" />
                                                </IconButton>
                                            </Box>
                                            <EditProject open={openProject[index] || false} project={projects} setProject={setProjects} index={index} handleClose={() => handleProjectClose(index)} />
                                            <DeleteProject open={deleteProject[index] || false} project={projects} setProject={setProjects} index={index} handleClose={() => handleDeleteProjectClose(index)} />
                                        </Box>
                                    ))}
                                    <AddProject open={openAddProject} project={projects} setProject={setProjects} setOpenProject={setOpenProject} setDeleteProject={setDeleteProject} handleClose={handleAddProjectClose} />
                                </Box>
                            </Box>
                        </Box>
                    </Box>
                </Box>
            }
        </Box>
    )
}
