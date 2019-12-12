import React, { useState } from "react";
import { Row, Col } from "antd";
import * as tf from '@tensorflow/tfjs';
import * as tmPose from '@teachablemachine/pose';
import styles from "assets/jss/nextjs-material-kit/pages/components.js";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(styles);

const Start = () => {
  const [startB, setStartB] = useState(true);
  const classes = useStyles();

  const URL = "https://teachablemachine.withgoogle.com/models/Nbw1m24Y/";
  let model, webcam, ctx, maxPredictions;
  let status = "";
  let count = 0;
  let startSound = -1;


  const init = async () => {
    const modelURL = URL + 'model.json';
    const metadataURL = URL + 'metadata.json';

    if (startSound == -1) {
      var audio = new Audio('../static/squattutorial.mp3')
      audio.play();
      var audio = new Audio('../static/7. Troye Sivan - Wild (feat. Alessia Cara) [Hibell Remix].mp3')
      audio.play();
      startSound = 0;
    }

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
  }

  const loop = async (timestamp) => {
    webcam.update(); // update the webcam frame
    await predict();
    window.requestAnimationFrame(loop);
  }

  const predict = async () => {
    // Prediction #1: run input through posenet
    // estimatePose can take in an image, video or canvas html element
    const { pose, posenetOutput } = await model.estimatePose(webcam.canvas);
    // Prediction 2: run input through teachable machine classification model
    const prediction = await model.predict(posenetOutput);

    const counthtml = document.getElementById('count');
    counthtml.innerHTML = String(count);

    if (prediction[0].probability.toFixed(2) > 0.95) {
      if (status === "squat") {
        // var audio = new Audio('../static/' + String((count % 10) + 1) + '.mp3')
        var audio = new Audio('../static/COMEON.mp3')
        count = count + 1
        audio.play();
        counthtml.innerHTML = String(count);
      }

      status = "stand";
    } else if (prediction[1].probability.toFixed(2) > 0.95) {
      status = "squat";
    } else if (prediction[2].probability.toFixed(2) > 0.95) {
      if (status === "squat" || status === "stand") {
        var audio = new Audio('../static/등견고하게.mp3')
        audio.play();
      }
      status = "bent_wrong";
    } else if (prediction[3].probability.toFixed(2) > 0.95) {
      if (status === "squat" || status === "stand") {
        var audio = new Audio('../static/knee.mp3')
        //audio.play();
      }
      //status = "knee_wrong";
    } else if (prediction[4].probability.toFixed(2) > 0.95) {
      if (status == "squat" || status == "stand") {
        var audio = new Audio('../static/wrong.mp3')
        audio.play();
      }
      status = "wrong";

    }

    // finally draw the poses
    drawPose(pose);

  }

  const drawPose = (pose) => {
    ctx.drawImage(webcam.canvas, 0, 0);
    // draw the keypoints and skeleton
    if (pose) {
      const minPartConfidence = 0.5;
      if (status === "wrong" || status === "knee_wrong" || status === "bent_wrong") {
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx, 5, 'red');
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx, 5, 'red');
      } else {
        tmPose.drawSkeleton(pose.keypoints, minPartConfidence, ctx, 5, 'aqua');
        tmPose.drawKeypoints(pose.keypoints, minPartConfidence, ctx, 5, 'aqua');
      }
    }

  }

  const startSquat = () => {
    setStartB(false)
    init();
  }

  const comeonSound = () => {
    var audio = new Audio('../static/squat!.mp3')
    audio.play();
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
                <img src="../static/squat.png" style={{ cursor: "pointer" }} height="830" onClick={startSquat} onMouseOver={comeonSound} />
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
                <h1 id="count" className={classes.title} style={{ position: "absolute", bottom: "25%", left: "29%" }}></h1>
              </Col>
            </>)}
        </Row>
      </div>
    </div>
  );
}

export default Start;