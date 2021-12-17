/* eslint-disable no-useless-return */
import * as typeorm from 'typeorm';

import { log } from '../renderer/helpers';
import { CTYPES } from '../components/constants';
import { createEntity } from './utils/createEntity';

export function typeormCreateInstance(type, props) {
  if (CTYPES.typeorm.connection === type) {
    return {
      type,
      props,
    };
  }

  if (CTYPES.typeorm.entity === type) {
    return {
      type,
      props: {
        ...props,
        columns: {},
      },
    };
  }

  if (CTYPES.typeorm.entityCreate === type) {
    return {
      type,
      entity: createEntity(props),
    };
  }

  if (CTYPES.typeorm.column === type) {
    return { type, props };
  }

  if (CTYPES.typeorm.start === type) {
    return {
      type,
      done: true,
    };
  }

  return null;
}

export function typeormAppendInitialChild(parentInstance, child) {
  if (CTYPES.typeorm.connection === child.type) {
    child.root = parentInstance;
    return;
  }

  if (CTYPES.typeorm.start === child.type && child.done) {
    const connectionConfig = { ...parentInstance.props };
    delete connectionConfig.app;
    delete connectionConfig.children;

    typeorm
      .createConnection(connectionConfig)
      .then(async (connection) => {
        parentInstance.root.locals.db = connection;
        log('success', `${connection.options.type} is connected`);
        return connection;
      })
      .catch((err) => log('error', err));
    return;
  }

  if (CTYPES.typeorm.column === child.type) {
    const key = child.props.name;

    parentInstance.props.columns = {
      ...parentInstance.props.columns,
      [key]: child.props,
    };
  }

  if (CTYPES.typeorm.entityCreate === child.type) {
    parentInstance.props = createEntity(parentInstance.props);
    return;
  }

  if (CTYPES.typeorm.entity === child.type) {
    parentInstance.props.entities.push(child.props);
    return;
  }

  return;
}
