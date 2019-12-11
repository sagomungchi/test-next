import React, { useState } from "react";
import { Player } from 'video-react';
// nodejs library that concatenates classes
import { makeStyles } from "@material-ui/core/styles";

// @material-ui/icons
// core components
import styles from "assets/jss/nextjs-material-kit/pages/components.js";
import "node_modules/video-react/dist/video-react.css"; // import css

const useStyles = makeStyles(styles);

const Howto = () => {
  const classes = useStyles();



  return (
    <div>
      <div style={{ width: "100%", bottom:"10%", position:"absolute" , paddingTop: 50 }}>
       <div style={{ margin: "auto" , marginTop:"75px",width:"70%"}}>
        <Player
          playsInline
          poster="../static/1.jpg"
          src="https://media.w3.org/2010/05/sintel/trailer_hd.mp4"
        />
        </div>
      </div>
    </div>
  );
}

export default Howto;