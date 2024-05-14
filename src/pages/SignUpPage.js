import React, { useState } from "react";
import styled from "styled-components";
import { Label } from "../components/label";
import { Input } from "components/input";
import { useForm } from "react-hook-form";
import Field from "components/field/Field";
import { IconEyeClose, IconEyeOpen } from "components/icon";
import { Button } from "components/button";

const SignUpPageStyles = styled.div`
  min-height: 100vh;
  padding: 40px;
  .logo {
    margin: 0 auto;
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
  const [tooglePassword, setTooglePassword] = useState(false);
  return (
    <SignUpPageStyles>
      <div className="container">
        <img
          srcSet="/sunflower.png 2x"
          alt="sunflower blogging logo"
          className="logo"
        />
        <form className="form" onSubmit={handleSubmit(handleSignUp)}>
          <Field>
            <Label htmlFor="fullname">Full Name</Label>
            <Input
              name="fullname"
              type="text"
              className="input"
              placeholder="Enter your fullname"
              control={control}
            ></Input>
          </Field>{" "}
          <Field>
            <Label htmlFor="email">Email</Label>
            <Input
              name="email"
              type="email"
              className="input"
              placeholder="Enter your email"
              control={control}
            ></Input>
          </Field>{" "}
          <Field>
            <Label htmlFor="password">Password</Label>
            <Input
              name="password"
              type={tooglePassword ? "text" : "password"}
              className="input"
              placeholder="Enter your password"
              control={control}
            >
              {!tooglePassword ? (
                <IconEyeClose
                  onClick={() => {
                    setTooglePassword(!tooglePassword);
                  }}
                ></IconEyeClose>
              ) : (
                <IconEyeOpen
                  onClick={() => {
                    setTooglePassword(!tooglePassword);
                  }}
                ></IconEyeOpen>
              )}
            </Input>
          </Field>
          <Button type="submit">Sign up</Button>
        </form>
      </div>
    </SignUpPageStyles>
  );
};

export default SignUpPage;
