
//REACT AND CONTEXTS
import { useState } from 'react'
import { useAuth } from '../context/UserAuthContext'
import { auth} from "../firebase";

import { sendPasswordResetEmail} from "firebase/auth";
import { Link } from 'react-router-dom';
import '../CSS/auth.css'

const Login = () => {
//<******************************VARIABLES*******************************>

    //AUTH CONTEXT
    const {Login, currentuser} = useAuth()

    //USER useSTATE
    const [user, setUser] = useState({
        email: "",
        password: "",
    })

//<******************************FUNCTIONS*******************************>

    const SubmitHandler = async () => {
        const { email, password} = user;
        Login(email, password)
        {currentuser && setUser({
            email: "",
            password: "",
          })
        };
      };
      
      //FORGOT PASSWORD
      const handleForgotPass = async() => {
        if(user.email != ""){
          await sendPasswordResetEmail(auth,user.email)
          alert("Password Reset Email Sent")
        }else{
          alert("Please Enter Email Address to Reset Password")
        }
      }
    return (
        <div className='extension-body'>
            <h1>Login</h1>
            <div className='forms'>
                <input
                    type="email"
                    placeholder="Email"
                    value={user.email}
                    onChange={(e) => setUser({ ...user, email: e.target.value })}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={user.password}
                    onChange={(e) => setUser({ ...user, password: e.target.value })}
                />
                <button onClick={SubmitHandler}>Login</button>
                <h6 onClick={handleForgotPass}>forgot password ?</h6>
                <h6>Not a user yet ?<span><Link to={"/register"}>signup</Link></span> </h6>
            </div>
        </div>
    );

}

export default Login;

