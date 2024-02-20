import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { useState } from 'react';
import VideoUrlApp from '../components/FFmpeg/videoUrlApp';
import { v4 } from 'uuid';
import { useAuth } from '../context/UserAuthContext';
import { storage } from '../firebase';
import { ref, uploadBytes, uploadString, getDownloadURL } from "firebase/storage";
import { doc, getDoc } from "firebase/firestore";
import { db } from '../firebase';



const Folder: React.FC = () => {

    //<=================VARIABLES==================>

    //VIDEO DATA
    const [trimmedVideoFile, setTrimmedVideoFile] = useState(null);
    const [metaData, setMetaData] = useState(null);
    const [audioFile, setAudioFile] = useState(null);
    const [fileImage, setFileImage] = useState(null);
    const [fileTitle, setFileTitle] = useState("");

    const id = window.location.hash.split("/")[2];

    //USER DATA
    const { currentuser } = useAuth();

    const [isUrlAdded, setIsUrlAdded] = useState(false);
    //const [tag, setTag] = useState("");
    // Temporary solution !!!!
    const tag = "test"
    const folderID = id

    const [userData, setUserData] = useState(null);

    //<=================FUNCTIONS==================>

    useEffect(() => {
        if(currentuser){
            //fetch current user data FIREBASE
            const fetchUserData = async () => {
                //FIREBASE FIRSOFTORE
                const userRef = doc(db, "users", currentuser.uid);
                const userSnap = await getDoc(userRef);
                if (userSnap.exists()) {
                    console.log("Document data:", userSnap.data());
                    const userData = userSnap.data();
                    setUserData(userData);
                }
            }
            fetchUserData();
        }
    },[])

    const createFile = async () => {
        if (currentuser && metaData.videoDuration < 10 && userData.subscription == false) {
          const currentUserId = currentuser.uid;
          const urlID = id;
        
          const folderFileId = `file_${v4()}`
          // STORAGE
          const audioMetadata = {
            contentType: 'audio/mp3',
          };
          // FILE NAME
          const allName = `${v4() + metaData.videoName}`
          const metaName = `videos/${allName}`
          const audioName = `audio/${allName}`
          // PATH NAME
          const storagePathVideo = `${"users"+ "/" + currentuser.uid + "/" + urlID + "/" + folderFileId + "/" + metaName}`;
          const storagePathAudio = `${"users"+ "/" + currentuser.uid + "/" + urlID + "/" + folderFileId + "/" + audioName}`;
          // STORAGE REF
          const videoRef = ref(storage, storagePathVideo);
          const audioRef = ref(storage, storagePathAudio);
          // UPLOAD TO STORAGE
          await uploadString(videoRef, trimmedVideoFile,'data_url',metaData)
          await uploadBytes(audioRef, audioFile, audioMetadata)
          // VIDEO URL
          const storageURL =  await getDownloadURL(videoRef);
          console.log("Video Uploaded To Storage")
          // Title
          const userFileTitle = fileTitle
          // Image URL
          const userFileImage = fileImage
          // TAG NAME 
          const userTag = tag
          //VIDEO SIZE
          const videoSize = metaData.videoSize 
          // DURATION
          const userVideoURL = storageURL
          // SET NEW FILE 
          const newFile = {
            content:"",
            title: userFileTitle,
            img: userFileImage,
            url: userVideoURL,
            id: folderFileId,
            folder_id: folderID,
            tag: userTag,
            duration: metaData.videoDurationString,
            storage_path_video: storagePathVideo,
            storage_path_audio: storagePathAudio,
            transcription:"",
            related_count: 0,
            video_size: videoSize
          };
      
          //UPDATE VIDEO
          const createResponse = await fetch(`http://localhost:3000/folder/file-create/${folderID}`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileToUpload: newFile, userId: currentUserId, currentStorageTake: userData.storage_take, videoSize: videoSize}),
          })
          if (createResponse.status === 200) {
            // Document exists, retrieve its data
            const StatusLog = await createResponse.json();
            console.log(StatusLog)
          }else  {
            alert("Something went wrong, try refreshing the page !");
          }
      
        } else if(currentuser && userData.subscription == true) {
          const currentUserId = currentuser.uid;
          const urlID = id;
          const folderFileId = `file_${v4()}`
          // STORAGE
          const audioMetadata = {
            contentType: 'audio/mp3',
          };
          // FILE NAME
          const allName = `${v4() + metaData.videoName}`
          const metaName = `videos/${allName}`
          const audioName = `audio/${allName}`
          // PATH NAME
          const storagePathVideo = `${"users"+ "/" + currentuser.uid + "/" + urlID + "/" + folderFileId + "/" + metaName}`;
          const storagePathAudio = `${"users"+ "/" + currentuser.uid + "/" + urlID + "/" + folderFileId + "/" + audioName}`;
          // STORAGE REF
          const videoRef = ref(storage, storagePathVideo);
          const audioRef = ref(storage, storagePathAudio);
          // UPLOAD TO STORAGE
          await uploadString(videoRef, trimmedVideoFile,'data_url',metaData)
          await uploadBytes(audioRef, audioFile,audioMetadata)
          // VIDEO URL
          const storageURL =  await getDownloadURL(videoRef);
          console.log("Video Uploaded")
          // Title
          const userFileTitle = fileTitle
          // Image URL
          const userFileImage = fileImage
          // TAG NAME 
          const userTag = tag
          //VIDEO SIZE
          const videoSize = metaData.videoSize 
        
          const userVideoURL = storageURL
          // SET NEW FILE 
          const newFile = {
            content:"",
            title: userFileTitle,
            img: userFileImage,
            url: userVideoURL,
            id: folderFileId,
            folder_id: folderID,
            tag: userTag,
            duration: metaData.videoDurationString,
            storage_path_video: storagePathVideo,
            storage_path_audio: storagePathAudio,
            transcription:"",
            related_count: 0,
            video_size: videoSize
          };
      
          //UPDATE VIDEO
          const createResponse = await fetch(`http://localhost:3000/folder/file-create/${folderID}`,{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ fileToUpload: newFile, userId: currentUserId, currentStorageTake: userData.storage_take, videoSize: videoSize}),
          })
          if (createResponse.status === 200) {
            // Document exists, retrieve its data
            const StatusLog = await createResponse.json();
            console.log(StatusLog)
          }else if (createResponse.status === 400) {
            alert("Something went wrong, try refreshing the page !");
          }
          
        }else{
          alert("Clip is too long for free users ! If you want to save longer then 10 minutes clips, please upgrade your account !")
        }
        alert("File Created")
    };

    const downloadVideo = () => {
        const videoFileToDownload = trimmedVideoFile;
        const a = document.createElement('a');
        a.href = videoFileToDownload;
        a.download = 'video.mp4';
        a.click();
    }
      
    return (
        <div className="extension-body">
            <h2>Clippify</h2>
            <VideoUrlApp handleUploadBtn={setIsUrlAdded} handleTitleInput={setFileTitle} setExtractMeta={setMetaData} setPassedAudioDataUrl={setAudioFile} fileImage={setFileImage} setPassedDataUrl={setTrimmedVideoFile}  />
            {isUrlAdded ? (
              <div style={{display:"flex",flexDirection:"row",width:"100%",justifyContent:"space-between"}}>
                <div className='btn-create-file' onClick={createFile}>
                    <h5>Add File</h5>
                </div>

                <div className='btn-dwnload-file' onClick={downloadVideo}>
                  <h5>Download</h5>
                </div>
              </div>
            ):null}
            <Link style={{position:"absolute",top:15,left:10}} to={"/"}><ArrowBackIosNewIcon /></Link>
        </div>
    );
};

export default Folder;
