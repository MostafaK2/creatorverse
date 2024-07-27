import { Typography, Box } from '@mui/material';
import WarningIcon from '@mui/icons-material/Warning';

const ErrorMessage = ({ error }) => {
    return (
        <Box 
            sx={{ 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center', 
                height: '80vh', 
                textAlign: 'center', 
                color: 'error.main' // Set color to error color defined in MUI
            }}
        >
            <WarningIcon sx={{ color: 'error.main', fontSize: 40, marginRight: 1 }} />
            <Typography variant="h6">
                {error}
            </Typography>
        </Box>
    );
};

export default ErrorMessage;