import React, { useState } from "react";
import { Row, Col } from "antd";
import * as tf from '@tensorflow/tfjs';
import * as tmPose from '@teachablemachine/pose';
import styles from "assets/jss/nextjs-material-kit/pages/components.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

const Start = () => {
  const [startB, setStartB] = useState(true);
  const [count, setCount] = useState(null);
  const [stand, setStand] = useState(null);
  const [squat, setSquat] = useState(null);
  const [bent, setBent] = useState(null);
  const [knee, setKnee] = useState(null);
  const [wrong, setWrong] = useState(null);

  const classes = useStyles();

  const countPlus = () =>{
    setCount(count+1);
    return(count)
  }

  const statusSet = () =>{
    let status = "";

    if (stand >= 0.95) {
      if (status === "squat") {
        countPlus();
        var audio = new Audio('../static/' + String((count % 10) + 1) + '.mp3')
        audio.play();
      }

      if (count === -1) {
        var audio = new Audio('../static/start.mp3')
        audio.play();
        countPlus();
      }
      status = "stand";
    } else if (squat >= 0.95) {
      status = "squat";
    } else if (bent >= 0.95) {
      if (status === "squat" || status === "stand") {
        var audio = new Audio('../static/bent.mp3')
        audio.play();
      }
      status = "bent_wrong";
    } else if (knee >= 0.95) {
      if (status === "squat" || status === "stand") {
        var audio = new Audio('../static/knee.mp3')
        audio.play();
      }
      status = "knee_wrong";
    } else if (wrong >= 0.95) {
      if (status == "squat" || status == "stand") {
        var audio = new Audio('../static/wrong.mp3')
        audio.play();
      }
      status = "wrong";
    }
  }

  const URL = "https://teachablemachine.withgoogle.com/models/Nbw1m24Y/";
  let model, webcam, ctx, labelContainer, maxPredictions;

  async function init() {
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    // load the model and metadata
    // Refer to tmPose.loadFromFiles() in the API to support files from a file picker
    model = await tmPose.load(modelURL, metadataURL);
    maxPredictions = model.getTotalClasses();

    // Convenience function to setup a webcam
    const flip = true; // whether to flip the webcam
    webcam = new tmPose.Webcam(738, 830, flip); // width, height, flip
    await webcam.setup(); // request access to the webcam
    webcam.play();
    window.requestAnimationFrame(loop);

    // append/get elements to the DOM
    const canvas = document.getElementById('canvas');
    canvas.width = 738; canvas.height = 725;
    ctx = canvas.getContext('2d');
    labelContainer = document.getElementById('label-container');
    for (let i = 0; i < maxPredictions; i++) { // and class labels
      labelContainer.appendChild(document.createElement('div'));
    }
  }

  async function loop(timestamp) {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  async function predict() {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    if(prediction){
    setStand(prediction[0].probability.toFixed(2))
    console.log(stand)
    setSquat(prediction[1].probability.toFixed(2))
    setBent(prediction[2].probability.toFixed(2))
    setKnee(prediction[3].probability.toFixed(2))
    setWrong(prediction[4].probability.toFixed(2))
    }
    statusSet();

    for (let i = 0; i < maxPredictions; i++) {
      const classPrediction =
        prediction[i].className + ': ' + prediction[i].probability.toFixed(2);
       labelContainer.childNodes[i].innerHTML = classPrediction;
    }
    // finally draw the poses
    drawPose(pose);
  }

  function drawPose(pose) {
    ctx.drawImage(webcam.canvas, 0, 0);
    // draw the keypoints and skeleton
    if (pose) {
      const minPartConfidence = 0.5;
      if (status === "wrong" || status === "knee_wrong" || status === "bent_wrong") {
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx, 6, 'red');
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx, 6, 'red');
      } else {
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx, 3, 'aqua');
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx, 3, 'aqua');
      }
    }

  }

  const startSquat = () => {
    setStartB(false)
    init();
  }
  

  return (
    <div>
      <div style={{ position: "relative", paddingTop: 65 }}>
        <Row>
          {startB ? (
            <>
              <Col sm={3}>
              </Col>
              <Col sm={9}  >
                <img src="../static/squat.png" style={{ cursor: "pointer" }} height="830" onClick={startSquat} />
              </Col>
              <Col sm={12} >
                <img src="../static/deadlift.png" height="830" />
              </Col>
            </>
          ) :
            (<>
              <Col sm={3}>
              </Col>
              <Col sm={9} style={{ paddingTop: 70 }}>
                <div><canvas id='canvas' style={{ borderRadius: 30, outline: "0.5 solid" }}></canvas></div>
              </Col>
              <Col sm={2}>
              </Col>
              <Col sm={10} >
                <br /> <br /> <br /><br /><br /> <br /> <br /> <br /> <br />
                <img src="../static/stopwatch.jpg" style={{ borderRadius: 30, outline: "0.5 solid", height: "500px" }} />
                <h1 className={classes.title} style={{ position: "absolute", bottom: "25%", left: "29%" }}>{count}</h1>
                <div id="label-container"></div>
              </Col>
            </>)}
        </Row>
      </div>
    </div>
  );
}

export default Start;