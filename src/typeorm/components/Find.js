import React from 'react';

export const FindOne = ({ entity, select, where, order }) => (
  <param$ type="typeorm.findOne" content={{ entity, select, where, order }} />
);

export const Find = ({ entity, select, where, order, take, skip }) => (
  <param$ type="typeorm.find" content={{ entity, select, where, order, take, skip }} />
);
