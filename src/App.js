import React, { useRef } from "react";
import Search from "./YTVideo/Search";
import "./styles.css";

var elem = document.documentElement;
export default function App() {
  const [fullScreen, setFullScreen] = React.useState(false);
  const [imgSrc, setImgSrc] = React.useState();
  const [imgTaken, setImgTaken] = React.useState(false);
  //required refs
  const cameraRef = useRef();
  const canvasRef = useRef();
  const captureRef = useRef();
  const imgRef = useRef();
  const screenShotRef = useRef();
  const mainRef = useRef();
  const videoRef = useRef();
  const buttonRef = useRef();

  const goFullScreen = () => {
    setFullScreen(true);
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.webkitRequestFullscreen) {
      /* Safari */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) {
      /* IE11 */
      elem.msRequestFullscreen();
    }
  };
  const closeScreen = async () => {
    setFullScreen(false);
    if (!document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) {
      /* IE11 */
      document.msExitFullscreen();
    }
  };

  //share content
  const shareScreenMedia = async () => {
    try {
      await navigator.share({ title: "Example Page", url: "" });
    } catch (e) {
      console.log(e.message);
    }
  };

  //pip mode
  const pipMode = () => {
    const pipButton = buttonRef.current;
    const video = videoRef.current;
    // Hide button if Picture-in-Picture is not supported.
    pipButton.hidden = !document.pictureInPictureEnabled;
    if (!document.pictureInPictureElement) {
      video.requestPictureInPicture().catch((error) => {
        // Video failed to enter Picture-in-Picture mode.
        console.log(error.message);
      });
    } else {
      document.exitPictureInPicture().catch((error) => {
        // Video failed to leave Picture-in-Picture mode.
        console.log(error.message);
      });
    }
  };

  //ScreenCapture
  const screenCapture = () => {
    const video = cameraRef.current;
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        video.srcObject = stream;
      })
      .catch((e) => console.log(e.message));
  };
  const ScreenShot = () => {
    setImgTaken(true);
    const video = cameraRef.current;
    const canvas = canvasRef.current;
    const img = imgRef.current;
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    let dataURL = canvas.toDataURL("image/png");
    img.src = dataURL;
    setImgSrc(dataURL);
  };

  const stopCamera = () => {
    const stream = cameraRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach((track) => {
      track.stop();
    });
  };
  return (
    <>
      <div className="app" ref={mainRef}>
        <video className="app__video" ref={videoRef} controls>
          <source
            src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
            type="video/mp4"
          />
        </video>
        <video className="app__cameraVideo" ref={cameraRef} autoPlay={true}>
          <source type="video/mp4" />
        </video>
        <img ref={imgRef} src="" alt="selfie" />
        <Search />
        <a href={imgSrc} download="selfie.png" className="btn download-btn">
          Wanna download your pic?
        </a>
        <canvas ref={canvasRef} style={{ display: "none" }}></canvas>

        {fullScreen ? (
          <button onClick={closeScreen}>CloseScreen</button>
        ) : (
          <button onClick={goFullScreen}>FullScreen</button>
        )}

        <button onClick={shareScreenMedia}>ShareContent</button>
        <button ref={buttonRef} onClick={pipMode}>
          PictureInPictureMode
        </button>
        <button ref={captureRef} onClick={screenCapture}>
          StartCamera
        </button>
        <button ref={screenShotRef} onClick={ScreenShot}>
          Take selifie
        </button>
        <button onClick={stopCamera}>StopCamera</button>
      </div>
    </>
  );
}
