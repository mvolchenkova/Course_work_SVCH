import './App.css';
import './i18n';
import i18n from './i18n';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
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
import ArticlesPage from './Pages/ArticlesPage/ArticlesPage';
import PlanPage from './Pages/PlanPage/PlanPage'
import RecipePage from './Pages/RecipePage/RecipePage'
import Ask from './Pages/Ask/Ask';
import Advices from './Pages/Advices/Advices';
import FavPlans from './Pages/FavPlans';
import FavRecipes from './Pages/FavRecipes'
import BotPage from './Pages/BotPage';
import CaloriesPage from './Pages/CaloriesPage/CaloriesPage';
import BodyMassIndex from './Pages/BodyMassIndex/BodyMassIndex';
import HeaderLog from './Components/HeaderLog/HeaderLog';
import Footer from './Components/Footer/Footer';
import WaterCalculator from './Pages/WaterCalculator/WaterCalculator';
import Achievements from './Pages/Achievements/Achievements';
import Exercises from './Pages/Exercises/Exercises';
import AssistantPage from './Pages/AssistantPage/AssistantPage'
import FatsecretPage from './Pages/FatsecretPage/FatsecretPage';
function App() {

    const dispatch = useDispatch();
    const [currentLang, setCurrentLang] = useState(i18n.language);
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch(setCurrentUser(JSON.parse(storedUser))); 
        }

        const handleLanguageChange = (lng) => {
            setCurrentLang(lng); 
        };

        i18n.on('languageChanged', handleLanguageChange);

        return () => {
            i18n.off('languageChanged', handleLanguageChange);
        };
    }, [dispatch]);
    
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            dispatch(setCurrentUser(JSON.parse(storedUser))); 
        }
    }, [dispatch]);
    

  return (
    <div key={currentLang} className="app-wrapper">
      <BrowserRouter>
      <HeaderLog/>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/homePage" element={<HomePage />} />
        <Route path="/allPlans" element={<AllPlansPage />} />
        <Route path="/authorization" element={<RegAuthPage/>} />
        <Route path="/registr" element={<RegistrationPage/>} />
        <Route path="/shedule" element={<CalendarPage/>}/>
        <Route path="/allNutrition" element={<AllNutritionPage/>}/>
        <Route path="/becomecoach" element={<BecomeCoachPage/>}/>
        <Route path="adminpanel" element={<AllUsersPage />}/>
        <Route path="/account" element={<AccountPage/>}/>
        <Route path="/articles" element={<ArticlesPage/>}/>
        <Route path="/plan" element={<PlanPage />} />
        <Route path="/recipe" element={<RecipePage/>}/>
        <Route path="/ask" element={<Ask/>}/>
        <Route path="/advices" element={<Advices/>}/>
        <Route path="/favPlans" element={<FavPlans/>}/>
        <Route path="/favRecipes" element={<FavRecipes/>}/>
        <Route path="/bot" element={<BotPage/>}/>
        <Route path="/calories" element={<CaloriesPage/>} />
        <Route path="/bodyMassIndex" element={<BodyMassIndex/>}/>
        <Route path='/waterCalc' element={<WaterCalculator/>}/>
        <Route path='/achievements' element={<Achievements/>}/>
        <Route path='/technique' element={<Exercises/>}/>
        <Route path='/assistant' element={<AssistantPage/>}/>
        <Route path='/fatsecret' element={<FatsecretPage/>}/>
      </Routes>
      <Footer/>
   </BrowserRouter>
   </div>
  );
}

export default App;
