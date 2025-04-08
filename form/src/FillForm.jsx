import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  TextField, 
  Button, 
  Container,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import { db } from './firebase';

const FillForm = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [formData, setFormData] = useState({
    ФИО: '',
    Телефон: '',
    "Кол-во взрослых людей": 1,
    "Кол-во детей": 0,
    Обед: 'Нет',
    Источник: '',
    "Ник (тг)": '',
    Предоплата: 0
  });

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const eventId = searchParams.get('event');
    
    if (eventId) {
      const fetchEvent = async () => {
        const docRef = doc(db, 'events', eventId);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEvent({ id: docSnap.id, ...docSnap.data() });
          // Устанавливаем предоплату по умолчанию
          setFormData(prev => ({
            ...prev,
            Предоплата: docSnap.data().Стоимость || 0
          }));
        }
      };
      fetchEvent();
    }
  }, [location.search]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const registrationData = {
        ...formData,
        Мероприятие: event.Мероприятие,
        Дата: event.Дата,
        timestamp: new Date().toISOString()
      };
      const url = '/registration-success';
      if (window.Telegram?.WebApp) {
        window.Telegram.WebApp.openLink(url);
      } else {
        navigate(url);
      }
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
    }
  };

  if (!event) return <div>Загрузка...</div>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Регистрация на мероприятие: {event.Мероприятие}
      </Typography>
      <Typography variant="subtitle1" gutterBottom sx={{ mb: 3 }}>
        Дата: {event.Дата} | Стоимость: {event.Стоимость} ₽
      </Typography>
      
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        <TextField
          label="ФИО"
          fullWidth
          required
          margin="normal"
          value={formData.ФИО}
          onChange={(e) => setFormData({...formData, ФИО: e.target.value})}
        />
        
        <TextField
          label="Телефон"
          fullWidth
          required
          margin="normal"
          value={formData.Телефон}
          onChange={(e) => setFormData({...formData, Телефон: e.target.value})}
        />
        
        <TextField
          label="Количество взрослых"
          type="number"
          fullWidth
          required
          margin="normal"
          value={formData["Кол-во взрослых людей"]}
          onChange={(e) => setFormData({...formData, "Кол-во взрослых людей": e.target.value})}
        />
        
        <TextField
          label="Количество детей"
          type="number"
          fullWidth
          margin="normal"
          value={formData["Кол-во детей"]}
          onChange={(e) => setFormData({...formData, "Кол-во детей": e.target.value})}
        />
        
        <FormControl fullWidth margin="normal">
          <InputLabel>Нужен обед?</InputLabel>
          <Select
            value={formData.Обед}
            label="Нужен обед?"
            onChange={(e) => setFormData({...formData, Обед: e.target.value})}
          >
            <MenuItem value="Да">Да</MenuItem>
            <MenuItem value="Нет">Нет</MenuItem>
          </Select>
        </FormControl>
        
        <TextField
          label="Ник в Telegram"
          fullWidth
          margin="normal"
          value={formData["Ник (тг)"]}
          onChange={(e) => setFormData({...formData, "Ник (тг)": e.target.value})}
        />
        
        <TextField
          label="Откуда узнали о мероприятии?"
          fullWidth
          margin="normal"
          value={formData.Источник}
          onChange={(e) => setFormData({...formData, Источник: e.target.value})}
        />
        
        <TextField
          label="Сумма предоплаты"
          type="number"
          fullWidth
          margin="normal"
          value={formData.Предоплата}
          onChange={(e) => setFormData({...formData, Предоплата: e.target.value})}
        />
        
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2, py: 2, backgroundColor: '#CBAD7A', '&:hover': { backgroundColor: '#b89d6a' } }}
        >
          Зарегистрироваться
        </Button>
      </Box>
    </Container>
  );
};

export default FillForm;