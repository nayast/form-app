import React from 'react';
import { Typography, Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const RegistrationSuccess = () => {
  const navigate = useNavigate();

  return (
    <Box sx={{ textAlign: 'center', mt: 8 }}>
      <Typography variant="h4" gutterBottom>
        Регистрация успешно завершена!
      </Typography>
      <Typography variant="body1" sx={{ mb: 4 }}>
        Спасибо за регистрацию. Мы свяжемся с вами в ближайшее время.
      </Typography>
      <Button 
        variant="contained" 
        sx={{ backgroundColor: '#CBAD7A', '&:hover': { backgroundColor: '#b89d6a' } }}
        onClick={() => navigate('/')}
      >
        Вернуться к календарю
      </Button>
    </Box>
  );
};

export default RegistrationSuccess;