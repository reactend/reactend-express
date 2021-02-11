/* eslint-disable no-param-reassign */
/* eslint-disable no-useless-return */
/* eslint-disable no-unused-vars */
import React from 'react';
import ReactReconciler from 'react-reconciler';
import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'compression';
import logger from 'morgan';

import { log } from './helpers';
import { generateRoute } from './generateRoute';
import { renderHTML } from './renderHTML';

let options = {
  appHOC: (Component) => <Component />,
  renderHTML,
};

const reconciler = ReactReconciler({
  getRootHostContext(rootContainerInstance) {},
  getChildHostContext(parentHostContext, type, rootContainerInstance) {},
  getPublicInstance(instance) {},
  prepareForCommit(containerInfo) {},
  resetAfterCommit(containerInfo) {},
  createInstance(type, props, rootContainerInstance, hostContext, internalInstanceHandle) {
    if (type === 'app') {
      const app = express();
      app.use(compression());
      app.use(express.json());
      app.use(express.urlencoded({ extended: true }));
      app.use(cookieParser());
      app.listen(props.port || 8080, () =>
        log('success', `app is running on ${props.port || 8080}`)
      );
      return app;
    }

    if (type === 'router') {
      const router = express.Router({
        caseSensitive: !!props.caseSensitive,
        mergeParams: !!props.mergeParams,
        strict: !!props.strict,
      });

      return { routerInstance: router, path: props.path };
    }

    if (type === 'route') {
      const paramsSeq = [];
      return {
        type,
        props: { ...props, paramsSeq },
      };
    }

    if (type === 'middleware') {
      return {
        type,
        props,
      };
    }

    if (type === 'param') {
      return {
        type,
        props,
      };
    }

    if (type === 'static') {
      return {
        path: props.path,
        static: express.static(props.publicPath, props.options),
      };
    }

    // eslint-disable-next-line react/destructuring-assignment
    if (type === 'logger') {
      return {
        type,
        props,
      };
    }

    return null;
  },

  appendInitialChild(parentInstance, child) {
    if (child.routerInstance) {
      if (parentInstance.routerInstance) {
        parentInstance.routerInstance.use(child.path || '/', child.routerInstance);
      } else {
        parentInstance.use(child.path || '/', child.routerInstance);
      }
      return;
    }

    if (child.type === 'route') {
      generateRoute(parentInstance.routerInstance, child.props, options);
      return;
    }

    if (child.type === 'middleware') {
      if (parentInstance.routerInstance) parentInstance.routerInstance.use(child.props.handler);
      if (parentInstance) parentInstance.use(child.props.handler);
      return;
    }

    if (child.type === 'param') {
      parentInstance.props.paramsSeq.push(child.props);
    }

    if (child.static) {
      parentInstance.use(...(child.path ? [child.path, child.static] : [child.static]));
      return;
    }

    if (child.type === 'logger') {
      if (!child.props.disabled) {
        parentInstance.use(logger(child.props.mode));
      }
      return;
    }
  },

  finalizeInitialChildren(instance, type, props, rootContainerInstance, hostContext) {},
  prepareUpdate(instance, type, oldProps, newProps, rootContainerInstance, hostContext) {},
  shouldSetTextContent(type, props) {},
  shouldDeprioritizeSubtree(type, props) {},
  createTextInstance(text, rootContainerInstance, hostContext, internalInstanceHandle) {
    return text;
  },

  now: null,

  isPrimaryRenderer: true,
  scheduleDeferredCallback: '',
  cancelDeferredCallback: '',

  supportsMutation: true,

  commitMount(instance, type, newProps, internalInstanceHandle) {},
  commitUpdate(instance, updatePayload, type, oldProps, newProps, internalInstanceHandle) {},
  resetTextContent(instance) {},
  commitTextUpdate(textInstance, oldText, newText) {},
  appendChild(parentInstance, child) {},
  appendChildToContainer(container, child) {
    if (child.type === 'app') {
      container = child;
    }
  },
  insertBefore(parentInstance, child, beforeChild) {},
  insertInContainerBefore(container, child, beforeChild) {},
  removeChild(parentInstance, child) {},
  removeChildFromContainer(container, child) {},
  clearContainer(container, child) {},
});

export const registerApp = (App, custom = options) => {
  options = {
    ...options,
    ...custom,
  };
  log('success', `starting...`);
  const container = reconciler.createContainer(null, false, false);
  reconciler.updateContainer(<App />, container, null, null);
};
