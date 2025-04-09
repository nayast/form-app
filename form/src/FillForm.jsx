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
  MenuItem,
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
    Обед: 0,
    Источник: '',
    "Ник (тг)": '',
    Предоплата: 0,
    Оплачено: false,
    ХР: false,
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
          setFormData((prev) => ({
            ...prev,
            Предоплата: Number(docSnap.data().Стоимость) || 0,
            Дата: docSnap.data().Дата || 0,
          }));
        }
      };
      fetchEvent();
    }
  }, [location.search]);

  const validateFIO = (value) => {
    return /^[а-яА-Яa-zA-Z\s]+$/.test(value);
  };

  const validatePhone = (value) => {
    return /^[\d\+\-]+$/.test(value);
  };

  const calculatePrepayment = () => {
    const totalPeople =
      Number(formData["Кол-во взрослых людей"]) +
      Number(formData["Кол-во детей"]);
    const totalLunches = Number(formData["Обед"]);
    const prepaymentPerPerson = Number(event?.Стоимость) || 0;

    return totalPeople * prepaymentPerPerson + totalLunches * 250;
  };

  const handleChange = (field, value) => {
    if (field === "ФИО" && !validateFIO(value)) return;
    if (field === "Телефон" && !validatePhone(value)) return;

    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Проверка обязательных полей
    if (!validateFIO(formData.ФИО)) {
      alert("ФИО должно содержать только буквы и быть длиннее 3 символов.");
      return;
    }

    if (!validatePhone(formData.Телефон)) {
      alert("Телефон должен содержать только цифры, плюсы или минусы.");
      return;
    }

    try {
      let paid = false;
      if (calculatePrepayment() === 0) paid = true;

      let at = "";
      if (!formData["Ник (тг)"].includes('@')) {
        at = '@';
      }

      const registrationId = Date.now().toString();
      const registrationData = {
        ...formData,
        "Ник (тг)": at + formData["Ник (тг)"],
        Мероприятие: event.Мероприятие,
        Дата: event.Дата,
        timestamp: new Date().toISOString(),
        Оплачено: paid,
        Предоплата: calculatePrepayment(),
      };

      const notifData = {
        type: "signed_up",
        username: at + formData["Ник (тг)"],
        data: event.Мероприятие,
        timestamp: event.Дата,
      };
      const notifRemind ={
        type: "remind",
        username: at + formData["Ник (тг)"],
        data: event.Мероприятие,
        timestamp: event.Дата,
      }

      // Сохраняем регистрацию
      await setDoc(doc(db, 'registrations', registrationId), registrationData);
      await setDoc(doc(db, 'notifications', registrationId), notifData);
      await setDoc(doc(db, 'notifications', registrationId), notifRemind);

      navigate('/registration-success');
    } catch (error) {
      console.error('Ошибка при регистрации:', error);
    }
  };

  if (!event) return <div>Загрузка...</div>;

  return (
    <Container maxWidth="sm" sx={{ mt: 4, backgroundColor: "white" }}>
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
          onChange={(e) => handleChange("ФИО", e.target.value)}
          error={!validateFIO(formData.ФИО)}
          helperText={
            !validateFIO(formData.ФИО)
              ? "ФИО должно содержать только буквы и быть длиннее 3 символов."
              : ""
          }
        />

        <TextField
          label="Телефон"
          fullWidth
          required
          margin="normal"
          value={formData.Телефон}
          onChange={(e) => handleChange("Телефон", e.target.value)}
          error={!validatePhone(formData.Телефон)}
          helperText={
            !validatePhone(formData.Телефон)
              ? "Телефон должен содержать только цифры, плюсы или минусы."
              : ""
          }
        />

        <TextField
          label="Количество взрослых"
          type="number"
          fullWidth
          required
          margin="normal"
          value={formData["Кол-во взрослых людей"]}
          onChange={(e) =>
            handleChange(
              "Кол-во взрослых людей",
              Math.min(Math.max(Number(e.target.value), 0), 30)
            )
          }
        />

        <TextField
          label="Количество детей"
          type="number"
          fullWidth
          margin="normal"
          value={formData["Кол-во детей"]}
          onChange={(e) =>
            handleChange(
              "Кол-во детей",
              Math.min(Math.max(Number(e.target.value), 0), 30)
            )
          }
        />

        <TextField
          label="Количество обедов"
          type="number"
          fullWidth
          margin="normal"
          value={formData["Обед"]}
          onChange={(e) =>
            handleChange(
              "Обед",
              Math.min(Math.max(Number(e.target.value), 0), 30)
            )
          }
        />

        <TextField
          label="Ник в Telegram"
          fullWidth
          margin="normal"
          value={formData["Ник (тг)"]}
          onChange={(e) => handleChange("Ник (тг)", e.target.value)}
        />

        <TextField
          label="Откуда узнали о мероприятии?"
          fullWidth
          margin="normal"
          value={formData.Источник}
          onChange={(e) => handleChange("Источник", e.target.value)}
        />

        <TextField
          label="Сумма предоплаты"
          type="number"
          fullWidth
          margin="normal"
          value={calculatePrepayment()}
          InputProps={{
            readOnly: true,
          }}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            mt: 3,
            mb: 2,
            py: 2,
            backgroundColor: '#CBAD7A',
            '&:hover': { backgroundColor: '#b89d6a' },
          }}
        >
          Зарегистрироваться
        </Button>
      </Box>
    </Container>
  );
};

export default FillForm;