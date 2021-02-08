import React from "react";
import PropTypes from "prop-types";
import { Res } from "./Res";

const BaseRoute = (method) => {
  const RouteComponent = ({
    children,
    path,
    handler,
    render,
    status,
    json,
    text,
  }) => (
    <route method={method} path={path} handler={handler}>
      {children}
      {render && <Res.Render component={render} />}
      {status && <Res.Status statusCode={status} />}
      {text && <Res.Content text={text} />}
      {json && <Res.Content json={json} />}
    </route>
  );

  RouteComponent.propTypes = {
    path: PropTypes.string,
    handler: PropTypes.func,
    render: PropTypes.func,
    status: PropTypes.number,
    json: PropTypes.any,
    text: PropTypes.string,
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
