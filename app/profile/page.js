'use client';
import React from 'react';
import { Box, CssBaseline } from '@mui/material';
import { useRouter } from 'next/navigation';
import ResponsiveHeader from '../components/ResponsiveHeader';
import { getProfile } from '../utils/getProfile';
import EducationSection from './EducationSection';
import WorkSection from './WorkSection';
import ProjectSection from './ProjectSection';
import Footer from '../components/Footer';

export default function Profile() {
    const router = useRouter();
    const [profile, setProfile] = React.useState(null);

    React.useEffect(() => {
        async function getProfileData() {
            const profile = await getProfile();
            if (!profile) {
                localStorage.removeItem('user');
                router.push('/login');
                return;
            }
            setProfile(profile);
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
                    // mb: 2,
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
                                <EducationSection educations={profile.educations} />
                                <WorkSection workExperience={profile.workExperiences} />
                                <ProjectSection projects={profile.projects} />
                            </Box>
                        </Box>
                    </Box>
                    <Footer />
                </Box>
            }
        </Box>
    )
}
