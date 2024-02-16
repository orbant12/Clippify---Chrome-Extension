import { useState, useEffect } from 'react';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import '../CSS/auth.css';
import { useAuth } from '../context/UserAuthContext';

const Register: React.FC = () => {
    const { SignUp, currentuser } = useAuth();

    const [userNamesArray, setUserNamesArray] = useState<string[]>([]);
    const [user, setUser] = useState({
        FullName: "",
        email: "",
        password: "",
    });

    const SubmitHandler = async () => {
        const { email, password, FullName } = user;
        if (password === "" || email === "" || FullName === "") {
            alert("Please fill in all the fields.");
        } else if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
        } else if (userNamesArray.includes(user.email)) {
            alert("Username already taken.");
        } else {
            SignUp(email, password, FullName);
            if (currentuser) {
                setUser({
                    FullName: "",
                    email: "",
                    password: "",
                });
            }
        }
    };

    useEffect(() => {
        const fetchUsernames = async () => {
            const colRef = collection(db, "users");
            const snapshot = await getDocs(colRef);
            const usernames = snapshot.docs.map(doc => doc.data().user_name);
            setUserNamesArray(usernames);
        };
        fetchUsernames();
    }, []);

    return (
        <div className='extension-body'>
            <h1>Register</h1>
            <div className='forms'>
                <input
                    type="text"
                    placeholder="Fullname"
                    value={user.FullName}
                    onChange={(e) => setUser({ ...user, FullName: e.target.value })}
                />
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
                <button onClick={SubmitHandler}>Sign up</button>
                <h6>Already a user? <span><a href="/login#/login">Login</a></span></h6>
            </div>
        </div>
    );
}

export default Register;
