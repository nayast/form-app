import React, { useState } from 'react';
import { 
  Box, 
  TextField, 
  Button, 
  Typography, 
  FormControl, 
  RadioGroup, 
  FormControlLabel, 
  Radio,
  Container,
  Paper
} from '@mui/material';

const FormPage = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    groupSize: '',
    childrenCount: '',
    eventName: '',
    paysForMeal: 'no',
    telegramNick: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Отправленные данные:', formData);
    // Здесь будет логика отправки данных
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, backgroundColor: '#f5f5f5' }}>
        <Typography variant="h4" component="h1" gutterBottom sx={{ 
          color: '#333', 
          mb: 4,
          textAlign: 'center',
          borderBottom: '2px solid #CBAD7A',
          pb: 2
        }}>
          Регистрация на мероприятие
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="ФИО"
            name="fullName"
            value={formData.fullName}
            onChange={handleChange}
            margin="normal"
            required
            sx={{ mb: 3 }}
          />
          
          <TextField
            fullWidth
            label="Телефон"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            margin="normal"
            required
            type="tel"
            sx={{ mb: 3 }}
          />
          
          <TextField
            fullWidth
            label="Количество людей в группе"
            name="groupSize"
            value={formData.groupSize}
            onChange={handleChange}
            margin="normal"
            type="number"
            inputProps={{ min: 1 }}
            sx={{ mb: 3 }}
          />
          
          <TextField
            fullWidth
            label="Количество детей"
            name="childrenCount"
            value={formData.childrenCount}
            onChange={handleChange}
            margin="normal"
            type="number"
            inputProps={{ min: 0 }}
            sx={{ mb: 3 }}
          />
          
          <TextField
            fullWidth
            label="Название мероприятия"
            name="eventName"
            value={formData.eventName}
            onChange={handleChange}
            margin="normal"
            required
            sx={{ mb: 3 }}
          />
          
          <FormControl component="fieldset" sx={{ mb: 3, width: '100%' }}>
            <Typography component="legend" sx={{ mb: 1, color: '#333' }}>
              Оплачиваете обед?
            </Typography>
            <RadioGroup
              row
              name="paysForMeal"
              value={formData.paysForMeal}
              onChange={handleChange}
            >
              <FormControlLabel 
                value="yes" 
                control={<Radio sx={{ color: '#CBAD7A' }} />} 
                label="Да" 
              />
              <FormControlLabel 
                value="no" 
                control={<Radio sx={{ color: '#CBAD7A' }} />} 
                label="Нет" 
              />
            </RadioGroup>
          </FormControl>
          
          <TextField
            fullWidth
            label="Ник в Telegram"
            name="telegramNick"
            value={formData.telegramNick}
            onChange={handleChange}
            margin="normal"
            required
            sx={{ mb: 4 }}
            InputProps={{
              startAdornment: <Typography sx={{ mr: 1, color: '#CBAD7A' }}>@</Typography>,
            }}
          />
          
          <Button
            fullWidth
            variant="contained"
            type="submit"
            sx={{
              py: 2,
              backgroundColor: '#CBAD7A',
              color: '#fff',
              '&:hover': {
                backgroundColor: '#b89d6a',
              }
            }}
          >
            Отправить заявку
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default FormPage;