import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import LaptopMacIcon from '@mui/icons-material/LaptopMac';
import { signOut } from 'firebase/auth'
import { auth } from '../firebase';

const Settings = () => {

    const handleSignout = () => {
        // FIREBASE AUTHENTICATION SIGNOUT
        signOut(auth).then(() => {
            console.log("Signout Successful");
        
            }).catch((error) => {
                console.log("Error in Signout",error);
            });
    }

    const hadnleOpenningHttps = () => {
        window.open("https://clippify.net");
    }

    return (
        <div className="extension-body">
            <h1>Settings</h1>
            <div className='folder-container'>
                <div className='setting-box' onClick={hadnleOpenningHttps}>
                    <LaptopMacIcon />
                    <h4 className='setting-text1'>Open Clippify</h4>
                </div>
                <div className='setting-box' onClick={handleSignout} >
                    <LogoutIcon />
                    <h4 className='setting-text2'>Logout</h4>
                </div>
            </div>
            <Link style={{position:"absolute",top:15,left:10}} to={"/"}><ArrowBackIosNewIcon /></Link>
        </div>
    );
}

export default Settings;
