

import {  BrowserRouter as Router,  Routes,  Route} from "react-router-dom";
import LandingScreen from './pages/LandingScreen'
import UserAuthContext from './context/UserAuthContext.jsx';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';

function App() {


  //ROUTER

  return (
    <>
    <UserAuthContext>
          <Router>
            <Routes>        
              <Route path="/landing" element={<LandingScreen />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/" element={<Home />} />
            </Routes>
          </Router>
        </UserAuthContext>
    </>
  )
}

export default App
