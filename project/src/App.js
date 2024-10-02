import logo from './logo.svg';
import './App.css';
import Header from './Components/HeaderLog/HeaderLog.jsx'
import Footer from './Components/Footer/Footer.jsx'
import Toolbar from './Components/Toolbar/Toolbar.jsx'

import { Component } from 'react'

function App() {
  return (
   <div>
      <Header/>
      <Toolbar/>
      <Footer/>
   </div>
  );
}

export default App;
