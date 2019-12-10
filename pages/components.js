import React, { useState } from "react";
import { Button, Row, Typography } from "antd";
// nodejs library that concatenates classes
import classNames from "classnames";
// react components for routing our app without refresh
import Link from "next/link";
// @material-ui/core components
import { makeStyles } from "@material-ui/core/styles";
// @material-ui/icons
// core components
import Parallax from "components/Parallax/Parallax.js";

import '../node_modules/antd/dist/antd.css'; // or 'antd/dist/antd.less'

import styles from "assets/jss/nextjs-material-kit/pages/components.js";
import { textAlign } from "@material-ui/system";

const useStyles = makeStyles(styles);

const Components = (props) => {
  const classes = useStyles();
  const { Text } = Typography;


  return (
    <div>
      <Parallax image={require("assets/img/nextjs_header.jpg")}>
        <div className={classes.container}>
          <div className={classes.brand}>
            <h1 className={classes.title} style={{ color: "Black" }}>AI for '</h1><h1 className={classes.title} style={{ color: "white" }}>Personal Training'</h1>
            <h3 className={classes.subtitle} style={{ color: "white" }}>
              A P.T Program Using Teachable Machine and NextJS.
            </h3>
            <Text underline strong={true} style={{ fontSize: 80, color: "white", cursor: "pointer" }} >Start!</Text>
          </div>
        </div>
      </Parallax>
    </div>
  );
}

export default Components;