import React from "react";
import styled from "styled-components";

const AuthPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto;
  }

  .form {
    max-width: 600px;
    margin: 0 auto;
  }
  .have-account {
    margin-bottom: 20px;
    a {
      display: inline-block;
      color: ${(props) => props.theme.primary};
      font-weight: 500;
    }
  }
`;
const AuthenticationPage = ({ children }) => {
  return (
    <AuthPageStyles>
      {" "}
      <div className="container">
        <img
          srcSet="/sunflower.png 2x"
          alt="sunflower blogging logo"
          className="logo"
        />
        {children}
      </div>
    </AuthPageStyles>
  );
};

export default AuthenticationPage;
