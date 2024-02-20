import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/UserAuthContext';
import { db } from '../firebase';
import { collection, getDocs } from 'firebase/firestore';
import SettingsIcon from '@mui/icons-material/Settings';

interface Folder {
    id: string; // Assuming the id is a string
    title: string;
    color: string;
}

const Home: React.FC = () => {
    const { currentuser } = useAuth();
    const [userFolders, setUserFolders] = useState<Array<Folder>>([]);

    useEffect(() => {
        if (currentuser) {
            const fetchUserFolders = async () => {
                const userFolderRef = collection(db, 'users', currentuser.uid, 'File-Storage');
                const userFolderSnapshot = await getDocs(userFolderRef);
                const folders: Folder[] = userFolderSnapshot.docs.map(doc => ({
                    id: doc.id,
                    title: doc.data().title,
                    color: doc.data().color, // Assuming title is a field in your Firestore document
                }));
                setUserFolders(folders);
            }
            fetchUserFolders();
        }
    }, [currentuser]);

    return (
        <div className="extension-body">
            <h2>Clippify</h2>
            <div className='folder-container'>
                {userFolders.map((folder) => (
                    <div className='folder-box' style={{backgroundColor:`${folder.color}`}}>
                        <Link to={`/folder/${folder.id}`} key={folder.id}>
                            <h1>{folder.title}</h1>
                        </Link>
                    </div>
                ))}
            </div>
            <Link style={{position:"absolute",top:15,left:10}} to={"/settings"}><SettingsIcon /></Link>
        </div>
    );
}

export default Home;
