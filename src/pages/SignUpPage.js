import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Label } from "../components/label";
import { Input } from "components/input";
import { useForm } from "react-hook-form";
import Field from "components/field/Field";
import { IconEyeClose, IconEyeOpen } from "components/icon";
import { Button } from "components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import PropsType from "prop-types";
import AuthenticationPage from "./AuthenticationPage";

const schemas = yup.object({
  fullname: yup.string().required("Please enter your full name"),
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Must have at least 8 characters or greater")
    .required("Please enter your password"),
});
const SignUpPage = () => {
  const navigate = useNavigate();
  const {
    control,
    handleSubmit,
    formState: { errors, isValid, isSubmitting },
    watch,
    reset,
  } = useForm({ mode: "onChange", resolver: yupResolver(schemas) });
  const handleSignUp = async (values) => {
    if (!isValid) return;
    console.log(values);
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, { displayName: values.fullname });

    const colRef = collection(db, "users");
    await addDoc(colRef, {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
    });
    toast.success("Register successfully");
    navigate("/");
  };
  const [tooglePassword, setTooglePassword] = useState(false);
  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0]?.message, { pauseOnHover: false, delay: 0 });
    }
  }, [errors]);
  useEffect(() => {
    document.title = "Register Page";
  });
  return (
    <AuthenticationPage>
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
        <div className="have-account">
          You already have account? <NavLink to={"/sign-in"}>Login</NavLink>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          style={{ width: 300, margin: "0 auto" }}
        ></Button>
      </form>
    </AuthenticationPage>
  );
};
Button.propTypes = {
  type: PropsType.string.isRequired,
};
export default SignUpPage;
