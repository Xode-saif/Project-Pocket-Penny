import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { GlobalStyle } from './styles/GlobalStyle'
import { GlobalProvider } from './context/globalContext'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './LoginComp/Login'
import Signup from './LoginComp/Signup'
import './index.css'



const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <GlobalStyle />
        <GlobalProvider>
          <Router>
            <Routes>
              <Route path="/" element={<App />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </Router>
        </GlobalProvider>
    </React.StrictMode>
)