import React from 'react';

export const Create = ({ entity, fields }) => (
  <param$ type="typeorm.create" content={{ entity, fields }} />
);

export const Delete = ({ entity, fields }) => (
  <param$ type="typeorm.delete" content={{ entity, fields }} />
);
