import React, { useState } from "react";
import { Carousel } from "antd";
// nodejs library that concatenates classes
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Parallax from "components/Parallax/Parallax.js";
import styles from "assets/jss/nextjs-material-kit/pages/components.js";

const useStyles = makeStyles(styles);

const Introduce = () => {
  const classes = useStyles();

  return (
    <div>
      <div style={{ width: "100%", bottom:"10%", position:"absolute" , paddingTop: 50}}>
        <Carousel autoplay >
            <img src="../static/2.jpg" style={{}} height="830" />
            <img src="../static/1.jpg" style={{}} height="830" />
            <img src="../static/3.jpg" style={{}} height="830" />
            <img src="../static/4.jpg" style={{}} height="830" />
            <img src="../static/5.jpg" style={{}} height="830" />
            <img src="../static/6.jpg" style={{}} height="830" />
            <img src="../static/7.jpg" style={{}} height="830" />
            <img src="../static/8.jpg" style={{}} height="830" />
            <img src="../static/9.jpg" style={{}} height="830" />
            <img src="../static/10.jpg" height="830" />
            <img src="../static/11.jpg" height="830" />
            <img src="../static/12.jpg" height="830" />
            <img src="../static/13.jpg" height="830" />
            <img src="../static/14.jpg" height="830" />
            <img src="../static/15.jpg" height="830" />
            <img src="../static/16.jpg" height="830" />
            <img src="../static/17.jpg" height="830" />
            <img src="../static/18.jpg" height="830" />
            <img src="../static/19.jpg" height="830" />
            <img src="../static/20.jpg" height="830" />
            <img src="../static/21.jpg" height="830" />
            <img src="../static/23.jpg" height="830" />
            <img src="../static/24.jpg" height="830" />
            <img src="../static/25.jpg" height="830" />
            <img src="../static/26.jpg" height="830" />
         
        </Carousel>
      </div>
    </div>
  );
}

export default Introduce;