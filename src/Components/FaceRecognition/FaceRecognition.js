import React from "react";

const FaceRecognition = ({ imageUrl, box, name }) => {
    return (
    //This div is the container that is holding our fetch image 
//    and the face detect box
      <div className="center ma">
        <div className="absolute mt2">
      {/* // we set our image SRC to the url of the fetch image */}
          <img id="inputimage" alt="" src={imageUrl} 
           width="500px" height="auto" />
            <div className="bounding-box"
             style={{
               top: box.topRow,
               right: box.rightCol,
               bottom: box.bottomRow,
               left: box.leftCol,
               position: "absolute",
               border: "solid",
               display: (box && Object.keys(box).length === 0 && box.constructor === Object)?"none":"block",
             }}
            ><span>{name}</span></div>
        </div>
      </div>
    );
  };
export default FaceRecognition;