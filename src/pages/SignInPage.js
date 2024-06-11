import { useAuth } from "contexts/auth-context";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { Field } from "components/field";
import { Label } from "components/label";
import { Input } from "components/input";
import { Button } from "components/button";
import { IconEyeClose, IconEyeOpen } from "components/icon";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
const schemas = yup.object({
  email: yup
    .string()
    .email("Please enter valid email")
    .required("Please enter your email"),
  password: yup
    .string()
    .min(8, "Must have at least 8 characters or greater")
    .required("Please enter your password"),
});
const SignInPage = () => {
  const [tooglePassword, setTooglePassword] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting, errors },
  } = useForm({
    mode: "onChange",
    resolver: yupResolver(schemas),
  });
  useEffect(() => {
    const arrayErrors = Object.values(errors);
    if (arrayErrors.length > 0) {
      toast.error(arrayErrors[0]?.message, { pauseOnHover: false, delay: 0 });
    }
  }, [errors]);
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  useEffect(() => {
    document.title = "Login Page";
    if (userInfo?.email) navigate("/");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userInfo]);
  const handleSignIn = async (values) => {
    if (!isValid) return;
    await signInWithEmailAndPassword(auth, values.email, values.password);
    navigate("/");
  };
  return (
    <AuthenticationPage>
      <form className="form" onSubmit={handleSubmit(handleSignIn)}>
        <Field>
          <Label htmlfor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            control={control}
          ></Input>
        </Field>{" "}
        <Field>
          <Label htmlfor="password">Email address</Label>
          <Input
            type="password"
            name="password"
            placeholder="Enter your password "
            control={control}
          >
            {" "}
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
          You have not had an account?{" "}
          <NavLink to={"/sign-up"}>Register now</NavLink>
        </div>
        <Button
          type="submit"
          disabled={isSubmitting}
          isLoading={isSubmitting}
          style={{ width: 300, margin: "0 auto" }}
        >
          Sign In
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
