import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Calendar from './Calendar';
import FillForm from './FillForm';
import RegistrationSuccess from './RegistrationSuccess';
import Test from './Test';
import { useEffect } from 'react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/fill-form" element={<FillForm />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
      </Routes>
    </Router>
  );
}

export default App;