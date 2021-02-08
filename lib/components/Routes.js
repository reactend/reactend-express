import React from "react";
import PropTypes from "prop-types";
import { METHODS } from "../renderer/helpers";

const BaseRoute = (method) => {
  const RouteComponent = ({ path, content, children }) => (
    <route method={method} path={path} content={content}>
      {children}
    </route>
  );

  RouteComponent.propTypes = {
    path: PropTypes.string,
    content: PropTypes.any,
    handler: PropTypes.func,
  };

  return RouteComponent;
};

export const Get = BaseRoute("get");
export const Post = BaseRoute("post");
export const Put = BaseRoute("put");
export const Head = BaseRoute("head");
export const Delete = BaseRoute("delete");
export const Options = BaseRoute("options");
export const Trace = BaseRoute("trace");
export const Copy = BaseRoute("copy");
export const Lock = BaseRoute("lock");
export const Mkcol = BaseRoute("mkcol");
export const Move = BaseRoute("move");
export const Purge = BaseRoute("purge");
export const Propfind = BaseRoute("propfind");
export const Proppatch = BaseRoute("proppatch");
export const Unlock = BaseRoute("unlock");
export const Report = BaseRoute("report");
export const Mkactivity = BaseRoute("mkactivity");
export const Checkout = BaseRoute("checkout");
export const Merge = BaseRoute("merge");
export const Msearch = BaseRoute("m-search");
export const Notify = BaseRoute("notify");
export const Subscribe = BaseRoute("subscribe");
export const Unsubscribe = BaseRoute("unsubscribe");
export const Patch = BaseRoute("patch");
export const Search = BaseRoute("search");
export const Connect = BaseRoute("connect");
