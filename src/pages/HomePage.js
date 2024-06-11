import Header from "components/layout/Header";
import { auth } from "firebase-app/firebase-config";
import { signOut } from "firebase/auth";
import HomeBanner from "module/HomeBanner";
import React from "react";
import styled from "styled-components";
const HomePageStyles = styled.div``;
const HomePage = () => {
  const handleSignOut = () => {
    signOut(auth);
  };
  return (
    <HomePageStyles>
      <Header></Header>
      <HomeBanner></HomeBanner>
    </HomePageStyles>
  );
};

export default HomePage;
