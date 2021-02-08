import React, { useContext, useMemo } from "react";
import styled from "styled-components";
import { ReqResContext } from "../../../lib";

const PAGES = [
  { path: "/", label: "Home", title: "@orkhanjafarovr" },
  { path: "/components", label: "Components", title: "Components Page" },
  {
    path: "https://github.com/gigantz/react-xpress",
    label: "Github",
    title: "Github",
  },
];

export const TopNav = () => {
  const { req } = useContext(ReqResContext);
  const pageTitle = useMemo(
    () => PAGES.find((p) => p.path === req.originalUrl).title,
    [req]
  );

  return (
    <TopWrapper currentPath={req.originalUrl}>
      <Logo href="/">{pageTitle}</Logo>
      {PAGES.map((page) => (
        <NavItem key={page.path} href={page.path}>
          {page.label}
        </NavItem>
      ))}
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

  @media (max-width: 600px) {
    justify-content: center;
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

  @media (max-width: 600px) {
    display: none;
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
