
import Calendar from './Calendar';
import FillForm from './FillForm';
import RegistrationSuccess from './RegistrationSuccess';

import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<Calendar />} />
        <Route path="/fill-form" element={<FillForm />} />
        <Route path="/registration-success" element={<RegistrationSuccess />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
