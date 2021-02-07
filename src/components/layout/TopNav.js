import React, { useContext } from "react";
import styled from "styled-components";
import { context } from "../../context";

export const TopNav = () => {
  const { req } = useContext(context);
  return (
    <TopWrapper currentPath={req.originalUrl}>
      <Logo href="/"> </Logo>
      <NavItem href="/">Home</NavItem>
      <NavItem href="/components">Components</NavItem>
      <NavItem href="https://github.com/gigantz/react-xpress">Github</NavItem>
    </TopWrapper>
  );
};

const TopWrapper = styled.nav`
  position: sticky;
  width: 100%;
  display: flex;
  align-items: center;
  background-color: ${(props) => props.theme.colors.brandVeryDark};

  &:before {
    content: "";
    height: 100%;
    width: 100vw;
    background-color: ${(props) => props.theme.colors.brandVeryDark};
    position: absolute;
    top: 0;
    left: 50%;
    margin-left: -50vw;
  }

  a[href="${(props) => props.currentPath}"] {
    color: ${(props) => props.theme.colors.brandVeryLight};

    &:before {
      background-color: ${(props) => props.theme.colors.brandVeryLight};
    }
  }
`;

const Logo = styled.a`
  position: relative;
  display: inline-block;
  color: ${(props) => props.theme.colors.white} !important;
  font-weight: bold;
  font-size: 20px;
  position: relative;
  text-decoration: none;
  margin-right: auto;
  padding: 0 10px;
  opacity: 0.1;

  &:hover {
    opacity: 1;
  }
`;

const NavItem = styled.a`
  margin-top: 5px;
  font-size: 18px;
  display: inline-block;
  padding: 15px 20px;
  text-decoration: none;
  color: ${(props) => props.theme.colors.white};
  position: relative;

  &:hover {
    color: ${(props) => props.theme.colors.brandVeryLight};
  }

  &:before {
    content: "";
    height: 3px;
    width: 100%;
    background-color: "transparent";
    position: absolute;
    bottom: 0;
    left: 0;
  }
`;
