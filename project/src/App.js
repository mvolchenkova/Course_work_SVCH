import './App.css';
import StartPage from './Pages/StartPage'
import HomePage from './Pages/HomePage/HomePage'
import Plans from './Pages/Plans'
import Profile from './Pages/Profile/Profile'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import RegistrationPage from './Pages/RegistrationPage';
import RegAuthPage from './Pages/RegAuthPage'


function App() {
  
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/allPlans" element={<Plans />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/registration" element={<RegAuthPage/>} />
        <Route path="/registr" element={<RegistrationPage/>} />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
