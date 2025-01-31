import React from "react";

export default function Video() {
  return (
    <div
      style={{
        height: "750px",
        width: "100%",
        display: "flex",
        justifyContent: "center",
        marginBottom: "2rem",
      }}
    >
      <iframe
        style={{ border: "0px" }}
        width="70%"
        height="731px"
        src="https://www.youtube.com/embed/StQyJR3uQgw"
        title="YouTube video player"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
    </div>
  );
}
