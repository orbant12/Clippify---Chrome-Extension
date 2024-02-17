import { HashRouter as Router, Routes, Route } from "react-router-dom";
import LandingScreen from './pages/LandingScreen';
import UserAuthContext from './context/UserAuthContext.jsx';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import Folder from './pages/Folder';
import Settings from './pages/Settings';

function App() {
  return (
    <>
      <UserAuthContext>
        <Router>
          <Routes>        
            <Route path="/landing" element={<LandingScreen />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/" element={<Home />} />
            <Route path="/folder/:id" element={<Folder />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
        </Router>
      </UserAuthContext>
    </>
  );
}

export default App;
