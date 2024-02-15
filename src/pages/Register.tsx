
import { useState } from 'react';

import '../CSS/auth.css'

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    
    const handleLogin = () => {
        console.log("login")
    }
    return (
        <div className='extension-body'>
            <h1>Register</h1>
            <div className='forms'>
                <input
                    type="email"
                    placeholder="Fullname"
                    value={fullname}
                    onChange={(e) => setFullname(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Sign up</button>
                <h6>Already a user ? <span><a href="/login">login</a></span> </h6>
            </div>
          
        </div>
    );

}

export default Register;

