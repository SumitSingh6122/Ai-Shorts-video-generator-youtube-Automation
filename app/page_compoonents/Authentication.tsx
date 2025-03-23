"use client";

import React, { ReactNode } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../config/firebase";

const provider = new GoogleAuthProvider();

const OnSignInClick = () => {
  signInWithPopup(auth, provider)
    .then((result) => {
      
      
      const user = result.user;
      console.log(user);
    })
    .catch((error) => {
      console.error("Error signing in:", error);
    });
};

interface Props {
  children: ReactNode;
}

const Authentication: React.FC<Props> = ({ children }) => {
  return <div onClick={OnSignInClick}>{children}</div>;
};

export default Authentication;
