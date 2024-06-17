import React, { Fragment, useState } from "react";
import Input from "./Input";
import { IconEyeClose, IconEyeOpen } from "components/icon";

const InputPasswordToggle = ({ control }) => {
  const [tooglePassword, setTooglePassword] = useState(false);
  if (!control) return null;
  return (
    <Fragment>
      <Input
        type={tooglePassword ? "text" : "password"}
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
    </Fragment>
  );
};

export default InputPasswordToggle;
