

const VideoPreviewBody = ({clipTitlePass, handleTitleEditPass}) => {
    return(
    <div className='video-preview'>
        <h3>{clipTitlePass}</h3>
        <h6 onClick={handleTitleEditPass} >click to edit title</h6>
        <video src="https://www.youtube.com/watch?v=5qap5aO4i9A" controls></video>
        <button>Create</button>
    </div>
    )
}

export default VideoPreviewBody;

