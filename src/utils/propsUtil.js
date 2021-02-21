const PREFIXES = {
  param: '$param.',
  query: '$query.',
  body: '$body.',
};

export function getFromParams(variable, params) {
  if (typeof variable === 'string' && variable.indexOf(PREFIXES.param) === 0) {
    const [, parsedVariable] = variable.split(PREFIXES.param);
    if (parsedVariable in params) return params[parsedVariable];
  }
  return null;
}

export function getFromQuery(variable, query) {
  if (typeof variable === 'string' && variable.indexOf(PREFIXES.query) === 0) {
    const [, parsedVariable] = variable.split(PREFIXES.query);
    if (parsedVariable in query) return query[parsedVariable];
  }

  return null;
}

export function getFromBody(variable, body) {
  if (typeof variable === 'string' && variable.indexOf(PREFIXES.body) === 0) {
    const [, parsedVariable] = variable.split(PREFIXES.body);
    if (parsedVariable in body) return body[parsedVariable];
  }

  return null;
}

export function passValues(req, input) {
  const obj = { ...input };

  for (const prop in obj) {
    const paramResult = getFromParams(obj[prop], req.params);
    const queryResult = getFromQuery(obj[prop], req.query);

    if (paramResult) obj[prop] = paramResult;
    else if (queryResult) obj[prop] = queryResult;
    else obj[prop] = undefined;
  }

  return obj;
}

export function replaceValues(req, text) {
  return text.replace(/(?<!\\)\$([^\W$]+\.[a-zA-Z0-9]+)/g, (value) => {
    const paramResult = getFromParams(value, req.params);
    const queryResult = getFromQuery(value, req.query);

    if (paramResult) return paramResult;
    if (queryResult) return queryResult;
    return value;
  });
}
