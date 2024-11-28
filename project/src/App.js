import './App.css';
import StartPage from './Pages/StartPage'
import HomePage from './Pages/HomePage/HomePage'
import AllPlansPage from './Pages/AllPlansPage'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import RegistrationPage from './Pages/RegistrationPage';
import RegAuthPage from './Pages/RegAuthPage'
import CalendarPage from './Pages/CalendarPage/CalendarPage';
import AllNutritionPage from './Pages/AllNutritionPage';


function App() {

  
  return (
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/allPlans" element={<AllPlansPage />} />
        <Route path="/authorization" element={<RegAuthPage/>} />
        <Route path="/registr" element={<RegistrationPage/>} />
        <Route path="/shedule" element={<CalendarPage/>}/>
        <Route path="/allNutrition" element={<AllNutritionPage/>}/>
      </Routes>
   </BrowserRouter>
   
  );
}

export default App;
