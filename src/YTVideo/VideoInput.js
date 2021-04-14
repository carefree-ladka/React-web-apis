import React from "react";

export default function VideoInput({ onSearch }) {
  const inputRef = React.useRef();
  const onVideoSearch = (e) => {
    e.preventDefault();
    const input = inputRef.current.value;
    console.log(input);
    onSearch(input);
  };
  return (
    <>
      <div className="displayVideos">
        <form>
          <input ref={inputRef} placeholder="Search videos..." />
          <input type="submit" onClick={onVideoSearch} />
        </form>
      </div>
    </>
  );
}
