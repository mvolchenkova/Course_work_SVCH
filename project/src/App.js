import './App.css';
import StartPage from './Pages/StartPage'
import HomePage from './Pages/HomePage/HomePage'
import AllPlansPage from './Pages/AllPlansPage'
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import RegistrationPage from './Pages/RegistrationPage';
import RegAuthPage from './Pages/RegAuthPage'
import CalendarPage from './Pages/CalendarPage/CalendarPage';
import AllNutritionPage from './Pages/AllNutritionPage';
import { setCurrentUser } from './slices/userSlice';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import PrivateRouteToBecomeCoach from './Components/privateRoutes/PrivateRouteToBecomeCoach/PrivateRouteToBecomeCoach';
import BecomeCoachPage from './Pages/BecomeCoachPage'
import AllUsersPage from './Pages/AllUsersPage/AllUsersPage';
import PrivateRouteToAllUsers from './Components/privateRoutes/PrivateRouteToAllUsers/PrivateRouteToAllUsers'
import AccountPage from './Pages/AccountPage'

function App() {

  const dispatch = useDispatch();

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch(setCurrentUser(JSON.parse(storedUser))); 
        }
    }, [dispatch]);
    

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
        <Route path="/becomecoach" element={
          <PrivateRouteToBecomeCoach>
            <BecomeCoachPage />
          </PrivateRouteToBecomeCoach>
        }></Route>
        <Route 
          path="allUsers" 
          element={
            <PrivateRouteToAllUsers>
            <AllUsersPage />
          </PrivateRouteToAllUsers>
          }
        />
        <Route path="/account" element={<AccountPage/>}/>
      </Routes>
   </BrowserRouter>
   
  );
}

export default App;
