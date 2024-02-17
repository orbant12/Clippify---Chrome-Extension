import React from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useState } from 'react';
import InputBody from '../components/trimming/inputBody';
import VideoPreviewBody from '../components/trimming/videoPreviewBody';


const Folder: React.FC = () => {

    //const folderID = window.location.hash.split("/")[2];

    const [isUrlAdded, setIsUrlAdded] = useState(false);

    //CLIP DETAILS
    const [clipTitle, setClipTitle] = useState("Untitled");

    //Clip title edit on click

    const handleTitleEdit = () => {
        const newTitle = prompt("Enter new title");
        if(newTitle){
            setClipTitle(newTitle);
        }
    }

    return (
        <div className="extension-body">
            <h1>Clippify</h1>
            {!isUrlAdded ? (
                <VideoPreviewBody clipTitlePass={clipTitle} handleTitleEditPass={handleTitleEdit} />
            ):(
                <InputBody setIsUrlAddedPass={setIsUrlAdded} />
            )
        }
            <Link style={{position:"absolute",top:15,left:10}} to={"/"}><ArrowBackIosNewIcon /></Link>
        </div>
    );
};

export default Folder;
