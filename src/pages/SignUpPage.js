import React from "react";
import styled from "styled-components";
import { Label } from "../components/label";
import { Input } from "components/input";
import { useForm } from "react-hook-form";

const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto;
  }
  .field {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    row-gap: 20px;
  }

  .form {
    max-width: 600px;
    margin: 0 auto;
  }
`;
const SignUpPage = () => {
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSU },
  } = useForm({});
  const handleSignUp = (values) => {
    console.log(values);
  };
  return (
    <SignUpPageStyles>
      <div className="container">
        <img
          srcSet="/sunflower.png 2x"
          alt="sunflower blogging logo"
          className="logo"
        />
        <form className="form" onSubmit={handleSubmit(handleSignUp)}>
          <div className="field">
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              name="fullname"
              type="text"
              className="input"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </div>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
