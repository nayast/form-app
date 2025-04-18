import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardMedia, 
  CardContent, 
  Modal,
  Button,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'events'));
        const eventsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setEvents(eventsData);
      } catch (error) {
        console.error('Ошибка загрузки мероприятий:', error);
      }
    };
    fetchEvents();
  }, []);

  const handleRegister = (event) => {
    console.log("Current location: ",window.location)
    navigate(`/fill-form?event=${encodeURIComponent(event.id)}`);
  };

  return (
    <Box sx={{ p: 3, backgroundColor: '#f5f5f5', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h4" component="h1" gutterBottom sx={{ 
        color: '#333', 
        mb: 4,
        textAlign: 'center',
        borderBottom: '2px solid #CBAD7A',
        pb: 2
      }}>
        Календарь мероприятий
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        {events.filter(event => event.Мероприятие !== "null").
          map((event) => (
          
          <Grid item key={event.id}>
            <Card sx={{ 
              width: 300, 
              height: 470, 
              display: 'flex', 
              flexDirection: 'column',
              borderRadius: 2,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              transition: 'box-shadow 0.3s ease',
              '&:hover': { boxShadow: '0 0 10px rgba(203, 173, 122, 0.5)' }
            }}>
              <CardMedia
                component="img"
                sx={{
                  height: '200px',
                  objectFit: 'cover',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px'
                }}
                image={event.Изображение || '/placeholder.jpg'}
                alt={event.Мероприятие}
              />
              <CardContent sx={{ flexGrow: 1, p: 2 }}>
                <Typography variant="h6" sx={{ fontSize: '1rem', fontWeight: 'bold', overflow: 'hidden', textOverflow: 'ellipsis', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                  {event.Мероприятие}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  Гид: {event.Гид}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Место: {event.Место}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Стоимость: {event.Стоимость} ₽
                </Typography>
              </CardContent>
              <Button 
                variant="contained" 
                fullWidth 
                sx={{ 
                  mt: 'auto', 
                  py: 1,
                  backgroundColor: '#CBAD7A',
                  '&:hover': { backgroundColor: '#b89d6a' },
                  borderTop: '1px solid #e0e0e0'
                }}
                onClick={() => {
                  setSelectedEvent(event);
                  setOpenModal(true);
                }}
              >
                Подробнее
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box sx={{
          width: '80%',
          maxWidth: 600,
          bgcolor: 'background.paper',
          p: 4,
          borderRadius: 2,
          position: 'relative',
          margin: '20px auto'
        }}>
          <IconButton onClick={() => setOpenModal(false)} sx={{ position: 'absolute', right: 8, top: 8 }}>
            <CloseIcon />
          </IconButton>
          
          {selectedEvent && (
            <>
              <Typography variant="h5" sx={{ color: '#CBAD7A', mb: 2 }}>
                {selectedEvent.Мероприятие}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Гид:</strong> {selectedEvent.Гид}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Место:</strong> {selectedEvent.Место}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Дата:</strong> {selectedEvent.Дата}
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Стоимость:</strong> {selectedEvent.Стоимость} ₽
              </Typography>
              <Typography variant="body1" paragraph>
                <strong>Описание:</strong> {selectedEvent.Описание}
              </Typography>
              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  py: 2,
                  backgroundColor: '#CBAD7A',
                  '&:hover': { backgroundColor: '#b89d6a' }
                }}
                onClick={() => handleRegister(selectedEvent)}
              >
                Записаться
              </Button>
            </>
          )}
        </Box>
      </Modal>
    </Box>
  );
};

export default Calendar;