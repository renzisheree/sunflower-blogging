import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

const NotFoundPageStyles = styled.div`
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-block: 40px;
  .img-logo {
    margin-left: 80px;
  }
  .heading {
    font-size: 60px;
    font-weight: bold;
    margin-block: 20px;
  }
  .back {
    display: inline-block;
    padding: 15px 30px;
    background-color: ${(props) => props.theme.primary};
    border-radius: 4px;
    font-weight: 500;
  }
`;
const NotFoundPage = () => {
  return (
    <NotFoundPageStyles>
      <NavLink to="/">
        <img
          srcSet="/sunflower.png 2x"
          alt="sflower_blogging_image"
          className="img-logo"
        />
      </NavLink>
      <h1 className="heading">Oops! Page not found</h1>
      <NavLink to="/" className={"back"}>
        Back to home
      </NavLink>
    </NotFoundPageStyles>
  );
};

export default NotFoundPage;
