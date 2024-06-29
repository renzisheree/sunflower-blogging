import { useAuth } from "contexts/auth-context";
import React, { useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import AuthenticationPage from "./AuthenticationPage";
import { useForm } from "react-hook-form";
import { Field } from "components/field";
import { Label } from "components/label";
import { Input } from "components/input";
import { Button } from "components/button";
import InputPasswordToggle from "components/input/InputPasswordToggle";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "firebase-app/firebase-config";
import { userRole } from "utils/constants";

const SignInPage = () => {
  const { handleSubmit, control } = useForm({
    mode: "onChange",
  });
  const navigate = useNavigate();
  const { userInfo } = useAuth();

  useEffect(() => {
    document.title = "Login Page";

    if (userInfo && userInfo.role) {
      if (userInfo.role === userRole.ADMIN) {
        navigate("/dashboard");
      } else {
        navigate("/");
      }
    }
  }, [userInfo, navigate, userRole.ADMIN]);

  const handleSignIn = async (values) => {
    try {
      await signInWithEmailAndPassword(auth, values.email, values.password);
    } catch (error) {
      console.error("Error signing in:", error);
    }
  };

  return (
    <AuthenticationPage>
      <form className="form" onSubmit={handleSubmit(handleSignIn)}>
        <Field>
          <Label htmlFor="email">Email address</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter your email address"
            control={control}
          />
        </Field>
        <Field>
          <Label htmlFor="password">Password</Label>
          <InputPasswordToggle control={control} />
        </Field>
        <div className="have-account">
          You already have an account?{" "}
          <NavLink to={"/sign-up"}>Sign up</NavLink>{" "}
        </div>
        <Button
          kind="primary"
          type="submit"
          style={{ maxWidth: 300, margin: "0 auto" }}
        >
          Sign In
        </Button>
      </form>
    </AuthenticationPage>
  );
};

export default SignInPage;
