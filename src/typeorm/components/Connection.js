import React from 'react';

export const Connection = ({
  name,
  type,
  host,
  port,
  username,
  password,
  url,
  database,
  useUnifiedTopology = false,
  useNewUrlParser = false,
  synchronize,
  logging,
  entities,
  children,
}) => (
  <typeormConnection$
    name={name}
    type={type}
    host={host}
    port={port}
    url={url}
    username={username}
    password={password}
    database={database}
    useUnifiedTopology={useUnifiedTopology}
    useNewUrlParser={useNewUrlParser}
    synchronize={synchronize}
    logging={logging}
    entities={entities || []}
  >
    {children}
    <typeormStart$ />
  </typeormConnection$>
);
