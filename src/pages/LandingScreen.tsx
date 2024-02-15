

import { Link } from 'react-router-dom';
import '../CSS/landing.css'

const LandingScreen = () => {
    return (
        <div className='extension-body'>
            <h1>Clippify</h1>
            <p>Capture important clips from videos and make it your own !</p>
            <div className='further-options'>
                <Link to="/login">Login</Link>
                <Link to="/signup">Signup</Link>
            </div>
        </div>
    );
    }

export default LandingScreen;