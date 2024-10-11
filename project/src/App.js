import './App.css';
import StartPage from './Pages/StartPage'
import HomePage from './Pages/HomePage'
import {BrowserRouter, Route, Routes} from 'react-router-dom'


function App() {
  return (
   <BrowserRouter>
      <Routes>
        <Route path="/" element={<StartPage />} />
        <Route path="/homePage" element={<HomePage />} />
      </Routes>
   </BrowserRouter>
  );
}

export default App;
