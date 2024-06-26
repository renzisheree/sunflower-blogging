import { LoadingSpinner } from "components/Loading";
import React from "react";
import { NavLink } from "react-router-dom";
import styled, { css } from "styled-components";

const ButtonStyles = styled.button`
  cursor: pointer;
  padding: 25px;
  line-height: 1;
  color: white;
  font-weight: 600;
  font-size: 18px;
  width: 100%;
  height: ${(props) => props.height || "66px"};
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 8px;

  ${(props) =>
    props.kind == "secondary" &&
    css`
      background-color: white;
      color: ${(props) => props.theme.primary};
    `};
  ${(props) =>
    props.kind == "primary" &&
    css`
      color: white;
      background-image: linear-gradient(
        to right bottom,
        ${(props) => props.theme.primary},
        ${(props) => props.theme.secondary}
      );
    `};

  &:disabled {
    opacity: 0.5;
    pointer-events: none;
  }
`;
const Button = ({
  type = "button",
  children,
  onClick = () => {},
  kind = "primary",
  ...props
}) => {
  const { isLoading, to } = props;
  const child = !!isLoading ? <LoadingSpinner></LoadingSpinner> : children;
  if (to !== "" && typeof to == "string") {
    return (
      <NavLink style={{ display: "inline-block" }} to={to}>
        <ButtonStyles kind={kind} type={type} {...props}>
          {child}
        </ButtonStyles>
      </NavLink>
    );
  }
  return (
    <ButtonStyles kind={kind} type={type} onClick={onClick} {...props}>
      {child}
    </ButtonStyles>
  );
};

export default Button;
