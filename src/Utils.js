export default function PIPMode(pipButton, video) {
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
}
