import React, { useEffect, useState } from "react";
import { Label } from "../components/label";
import { Input } from "components/input";
import { useForm } from "react-hook-form";
import Field from "components/field/Field";
import { Button } from "components/button";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "firebase-app/firebase-config";
import { NavLink, useNavigate } from "react-router-dom";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import PropsType from "prop-types";
import AuthenticationPage from "./AuthenticationPage";
import InputPasswordToggle from "components/input/InputPasswordToggle";

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
    const user = await createUserWithEmailAndPassword(
      auth,
      values.email,
      values.password
    );
    await updateProfile(auth.currentUser, { displayName: values.fullname });

    await setDoc(doc(db, "users", auth.currentUser.uid), {
      fullname: values.fullname,
      email: values.email,
      password: values.password,
    });

    toast.success("Register successfully");
    navigate("/");
  };
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
          <InputPasswordToggle control={control}></InputPasswordToggle>
        </Field>
        <div className="have-account">
          You already have account? <NavLink to={"/sign-in"}>Login</NavLink>
        </div>
        <Button
          kind="primary"
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          style={{ width: "100%", maxWidth: 300, margin: "0 auto" }}
        >
          Sign up
        </Button>
      </form>
    </AuthenticationPage>
  );
};
Button.propTypes = {
  type: PropsType.string.isRequired,
};
export default SignUpPage;
