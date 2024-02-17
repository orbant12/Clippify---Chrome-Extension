import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useState } from 'react';


const Folder: React.FC = () => {

    const folderID = window.location.hash.split("/")[2];

    const [isUrlAdded, setIsUrlAdded] = useState(false);

    //CLIP DETAILS
    const [clipTitle, setClipTitle] = useState("Untitled");

    //Clip title edit on click

    const [isClipEditing, setIsClipEditing] = useState(false);

    const handleTitleEdit = () => {
        const newTitle = prompt("Enter new title");
        if(newTitle){
            setClipTitle(newTitle);
        }
    }


    return (
        <div className="extension-body">
            <h1>Clippify</h1>
            {isUrlAdded ? (
                <div className='video-preview'>
                    {isClipEditing ? <input type="text" value={clipTitle} onChange={(e) => setClipTitle(e.target.value)} /> : <h3>{clipTitle}</h3>}
                    <h6 onClick={handleTitleEdit} >click to edit title</h6>
                    <video src="https://www.youtube.com/watch?v=5qap5aO4i9A" controls></video>
                    <button>Create</button>
                </div>
              
           
            ):(
            <div className='urlInputContainer'>
                <h3>Insert Video URL</h3>
                <input type="text" placeholder="Paste URL here" />
                <button>Clip this</button>
            </div>
            )
        }
            <Link style={{position:"absolute",top:15,left:10}} to={"/"}><ArrowBackIosNewIcon /></Link>
        </div>
    );
};

export default Folder;
