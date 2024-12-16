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
import AccountPage from './Pages/AccountPage'
import ArticlesPage from './Pages/ArticlesPage';
import PlanPage from './Pages/PlanPage/PlanPage'
import RecipePage from './Pages/RecipePage/RecipePage'
import Ask from './Pages/Ask/Ask';
import WriteReviewPage from './Pages/WriteReviewPage/WriteReviewPage';
import Advices from './Pages/Advices/Advices';

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
            <BecomeCoachPage />
        }></Route>
        <Route path="adminpanel" element={<AllUsersPage />}/>
        <Route path="/account" element={<AccountPage/>}/>
        <Route path="/articles" element={<ArticlesPage/>}/>
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/recipe" element={<RecipePage/>}/>
        <Route path="/ask" element={<Ask/>}/>
        <Route path="/review" element={<WriteReviewPage/>}/>
        <Route path="/advices" element={<Advices/>}/>
      </Routes>
   </BrowserRouter>
   
  );
}

export default App;
