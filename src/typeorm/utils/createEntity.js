import { EntitySchema } from 'typeorm';

export function createEntity(props) {
  const { name, target, columns, relations } = props;
  return new EntitySchema({
    name,
    target,
    columns,
    relations: relations || {},
  });
}
