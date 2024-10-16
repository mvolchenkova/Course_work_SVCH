import './App.css';
import StartPage from './Pages/StartPage'
import HomePage from './Pages/HomePage'
import Plans from './Pages/Plans'
import Profile from './Pages/Profile/Profile'
import {BrowserRouter, Route, Routes} from 'react-router-dom'


function App() {
  
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/allPlans" element={<Plans />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
