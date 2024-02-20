
import './global.css';

const OutputVideo2 = ({  videoSrc }) => {
    return videoSrc ? (
    <>
        <div className="bord_g_2 p_2">
          <video crossOrigin="anonymus" src={videoSrc} autoPlay controls muted width="300"></video>
        </div>
       </>
    ) : null;
  };
  
  export default OutputVideo2;