import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useAuth } from '../context/UserAuthContext';
import { db } from '../firebase';
import { addDoc, collection, getDocs } from 'firebase/firestore';
import SettingsIcon from '@mui/icons-material/Settings';
import ClearIcon from '@mui/icons-material/Clear';

interface Folder {
    id: string; // Assuming the id is a string
    title: string;
    color: string;
}

const Home: React.FC = () => {
    const { currentuser } = useAuth();
    const [userFolders, setUserFolders] = useState<Array<Folder>>([]);
    const [isCreating, setIsCreating] = useState(false);

    //INPUTS FOR CREATING FOLDER
    const [inputTitle, setInputTitle] = useState('');
    const [color, setColor] = useState('');


    //HANDLERS FOR CREATING FOLDER

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputTitle(e.target.value);
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setColor(e.target.value);
    }

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

    useEffect(() => {
        if (currentuser) {
            fetchUserFolders();
        }
    }, [currentuser]);

    const handleFolderCreate = async () => {
        if (currentuser) {
            const userFolderRef = collection(db, 'users', currentuser.uid, 'File-Storage');
            await addDoc(userFolderRef, {
                title: inputTitle,
                color: color,
            });
            setInputTitle('');
            setColor('');
            setIsCreating(!isCreating);
        }
        fetchUserFolders();
    }

    return (
        <div className="extension-body">
            <h2>Clippify</h2>
            <div className="create-folder-container">
                {!isCreating ? (
                    <div className="create-folder" onClick={()=> setIsCreating(!isCreating)}>
                        <h6>+ Create Folder</h6>
                    </div>
                ):(
                    <div className='create-folder-inputs'>
                         <hr />
                        <div className='title-input'>
                            <div className='top-bar'>
                                <div className='inputfield-class'>
                                    <h6>Title:</h6>
                                    <input className='title-inputbar' onChange={handleTitleChange} type="text" placeholder="Folder Title" />
                                </div>
                                <div onClick={()=> setIsCreating(!isCreating)}>
                                    <ClearIcon className='cancel-btn' />
                                </div>
                              
                            </div>
                
                            <div className='bottom-bar'>
                                <input type="color" onChange={handleColorChange} />
                                <div className='add-btn' onClick={handleFolderCreate}>
                                    <h5>Create</h5>
                                </div>
                            </div>
                
                        </div>

                        <hr />
                    </div>
                  
                )}
            
            </div>
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
