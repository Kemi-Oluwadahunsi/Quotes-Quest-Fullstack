// App.js
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useState } from 'react';
import Homepage from './Components/Homepage';
import Login from './Components/Login-Logout/Login';
import Signup from './Components/Login-Logout/Signup';
import HowItWorks from './Components/HowItWorks';
import GetQuotes from './Components/GetQuotes';
import MakeYourDesigns from './Components/MakeYourDesigns';
import './App.css';

function App() {
  const [quote, setQuote] = useState(null);

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signUp" element={<Signup />} />
          <Route path="/howitworks" element={<HowItWorks />} />
          <Route path="/getquotes" element={<GetQuotes setQuote={setQuote} />} />
          <Route path="/makedesigns" element={<MakeYourDesigns quote={quote} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;

