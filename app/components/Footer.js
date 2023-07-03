import { Box, Container, Typography } from '@mui/material';

function Footer() {
    return (
        <Box sx={{
            backgroundColor: '#fafafa',
            borderTop: '1px solid #dbdbdb',
            mt: 3,
            p: 2,
        }}>
            <Container maxWidth="sm">
                <Typography variant="body1" align="center">
                    &copy; {new Date().getFullYear()} with ❤️ by kty
                </Typography>
            </Container>
        </Box>
    );
}

export default Footer;
