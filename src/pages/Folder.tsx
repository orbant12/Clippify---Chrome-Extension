import React from 'react';


const Folder: React.FC = () => {

    const folderID = window.location.hash.split("/")[2];

    return (
        <div className="extension-body">
            <h1>Clippify</h1>
            <h2>{folderID}</h2>
        </div>
    );
};

export default Folder;
