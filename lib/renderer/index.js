import ReactReconciler from "react-reconciler";
import express from "express";
import { join } from "path";
import { log, METHODS } from "./helpers";
import { generateRoute } from "./generateRoute";

let reconciler = ReactReconciler({
  getRootHostContext(rootContainerInstance) {},

  getChildHostContext(parentHostContext, type, rootContainerInstance) {},

  getPublicInstance(instance) {},

  prepareForCommit(containerInfo) {},

  resetAfterCommit(containerInfo) {},

  createInstance(
    type,
    props,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    if (type === "app") {
      const app = express();

      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.listen(props.port || 8080, () =>
        log("success", `app is running on ${props.port || 8080}`)
      );
      return app;
    }

    if (type === "router") {
      const router = express.Router({
        caseSensitive: !!props.caseSensitive,
        mergeParams: !!props.mergeParams,
        strict: !!props.strict,
      });
      return { routerInstance: router, path: props.path };
    }

    if (type === "route") {
      return {
        type,
        props,
      };
    }

    if (type === "static") {
      return {
        path: props.path,
        static: express.static(
          join(__dirname, "../..", props.publicPath),
          props.options
        ),
      };
    }
  },

  appendInitialChild(parentInstance, child) {
    if (child.routerInstance) {
      if (parentInstance.routerInstance) {
        parentInstance.routerInstance.use(
          child.path || "/",
          child.routerInstance
        );
      } else {
        parentInstance.use(child.path || "/", child.routerInstance);
      }
      return;
    }

    if (child.type === "route") {
      generateRoute(parentInstance, child.props);
      return;
    }

    if (child.static) {
      parentInstance.use(
        ...(child.path ? [child.path, child.static] : [child.static])
      );
      return;
    }
  },

  finalizeInitialChildren(
    instance,
    type,
    props,
    rootContainerInstance,
    hostContext
  ) {},

  prepareUpdate(
    instance,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
    hostContext
  ) {},

  shouldSetTextContent(type, props) {},

  shouldDeprioritizeSubtree(type, props) {},

  createTextInstance(
    text,
    rootContainerInstance,
    hostContext,
    internalInstanceHandle
  ) {
    return text;
  },

  now: null,

  isPrimaryRenderer: true,
  scheduleDeferredCallback: "",
  cancelDeferredCallback: "",

  supportsMutation: true,

  commitMount(instance, type, newProps, internalInstanceHandle) {},

  commitUpdate(
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    internalInstanceHandle
  ) {},

  resetTextContent(instance) {},

  commitTextUpdate(textInstance, oldText, newText) {},

  appendChild(parentInstance, child) {},

  appendChildToContainer(container, child) {
    if (child.type === "app") {
      container = child;
    }
  },

  insertBefore(parentInstance, child, beforeChild) {},

  insertInContainerBefore(container, child, beforeChild) {},

  removeChild(parentInstance, child) {},

  removeChildFromContainer(container, child) {},

  clearContainer(container, child) {},
});

export const ReactXpress = {
  render(app) {
    log("success", `starting...`);
    let container = reconciler.createContainer(null, false, false);
    reconciler.updateContainer(app, container, null, null);
  },
};
