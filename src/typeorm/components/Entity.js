import React from 'react';
import PropTypes from 'prop-types';

/**
 * Column
 * @param {string} type - Type.
 * @param {string} name - Name.
 * @param {number} length - Length.
 * @param {number} width - Width.
 * @param {string} onUpdate - On Update.
 * @param {boolean} nullable - Nullable.
 * @param {boolean} update - Update.
 * @param {boolean} objectId - Object Id.
 * @param {boolean} insert - Insert.
 * @param {boolean} select - Select.
 * @param {*} defaultValue - Default Value.
 * @param {*} mode - Mode.
 * @param {boolean} primary - Primary.
 * @param {boolean} unique - Unique.
 * @param {string} comment - Comment.
 * @param {number} precision - Precision.
 * @param {number} scale - Scale.
 * @param {boolean} zerofill - Zerofill.
 * @param {boolean} unsigned - Unsigned.
 * @param {string} charset - Charset.
 * @param {string} collation - Collation.
 * @param {string[]} enumValue - Enum Value.
 * @param {string} asExpression - As Expression.
 * @param {('VIRTUAL'|'STORED')} generatedType - Generated Type.
 * @param {(object | string)} hstoreType - Hstore Type.
 * @param {boolean} array - Array.
 * @param {function} transformer - Transformer.
 */
export const Column = ({
  type,
  name,
  length,
  width,
  onUpdate,
  nullable,
  update,
  insert,
  select,
  defaultValue,
  primary,
  unique,
  comment,
  precision,
  scale,
  zerofill,
  unsigned,
  charset,
  collation,
  enumValue,
  asExpression,
  generatedType,
  hstoreType,
  array,
  transformer,
  objectId,
  mode,
  children,
  ...rest
}) => (
  <typeormColumn$
    objectId={objectId}
    type={type}
    name={name}
    length={length}
    width={width}
    onUpdate={onUpdate}
    nullable={nullable}
    update={update}
    insert={insert}
    select={select}
    default={defaultValue}
    primary={primary}
    unique={unique}
    comment={comment}
    precision={precision}
    scale={scale}
    zerofill={zerofill}
    unsigned={unsigned}
    charset={charset}
    collation={collation}
    enum={enumValue}
    asExpression={asExpression}
    generatedType={generatedType}
    hstoreType={hstoreType}
    array={array}
    transformer={transformer}
    mode={mode}
    {...rest}
  >
    {children}
  </typeormColumn$>
);

const COLUMN_TYPES = [
  'int',
  'int2',
  'int4',
  'int8',
  'smallint',
  'integer',
  'bigint',
  'decimal',
  'numeric',
  'real',
  'float',
  'float4',
  'float8',
  'double precision',
  'money',
  'character varying',
  'varchar',
  'character',
  'char',
  'text',
  'citext',
  'hstore',
  'bytea',
  'bit',
  'varbit',
  'bit varying',
  'timetz',
  'timestamptz',
  'timestamp',
  'timestamp without time zone',
  'timestamp with time zone',
  'date',
  'time',
  'time without time zone',
  'time with time zone',
  'interval',
  'bool',
  'boolean',
  'enum',
  'point',
  'line',
  'lseg',
  'box',
  'path',
  'polygon',
  'circle',
  'cidr',
  'inet',
  'macaddr',
  'tsvector',
  'tsquery',
  'uuid',
  'xml',
  'json',
  'jsonb',
  'int4range',
  'int8range',
  'numrange',
  'tsrange',
  'tstzrange',
  'daterange',
  'geometry',
  'geography',
  'cube',
  'ltree',
];

Column.propTypes = {
  type: PropTypes.oneOf(COLUMN_TYPES),
  name: PropTypes.string,
  length: PropTypes.number,
  width: PropTypes.number,
  onUpdate: PropTypes.string,
  nullable: PropTypes.bool,
  update: PropTypes.bool,
  objectId: PropTypes.bool,
  insert: PropTypes.bool,
  select: PropTypes.bool,
  defaultValue: PropTypes.any,
  mode: PropTypes.any,
  primary: PropTypes.bool,
  unique: PropTypes.bool,
  comment: PropTypes.string,
  precision: PropTypes.number,
  scale: PropTypes.number,
  zerofill: PropTypes.bool,
  unsigned: PropTypes.bool,
  charset: PropTypes.string,
  collation: PropTypes.string,
  enumValue: PropTypes.arrayOf(PropTypes.string),
  asExpression: PropTypes.string,
  generatedType: PropTypes.oneOf(['VIRTUAL', 'STORED']),
  hstoreType: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
  array: PropTypes.bool,
  transformer: PropTypes.func,
  children: PropTypes.node,
};

export const Entity = ({ name, target, children, relations }) => (
  <typeormEntity$ name={name} target={target || name} relations={relations}>
    {children}
    <typeormEntityCreate$ />
  </typeormEntity$>
);
