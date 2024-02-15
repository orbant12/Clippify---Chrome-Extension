
import { useState } from 'react';

import '../CSS/auth.css'

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = () => {
        console.log("login")
    }
    return (
        <div className='extension-body'>
            <h1>Login</h1>
            <div className='forms'>
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
                <button onClick={handleLogin}>Login</button>
                <h6>Not a user yet ?<span><a href="/register">signup</a></span> </h6>
            </div>
        </div>
    );

}

export default Login;

