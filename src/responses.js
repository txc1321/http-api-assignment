const respond = (request, response, status, content, type) => {
  response.writeHead(status, { 'Content-Type': type });
  response.write(content);
  response.end();
};

const respondMeta = (request, response, status, type) => {
  const headers = { 'Content-Type': type };
  response.writeHead(status, headers);
  response.end();
};

const success = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Successful Response',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 200, responseXML, 'text/xml');
  }

  const jsonString = JSON.stringify(responseJSON);

  return respond(request, response, 200, jsonString, 'application/json');
};

const badRequest = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'Request Has Required Parameters',
  };

  if (!params.valid || params.valid !== 'true') {
    responseJSON.message = 'Missing Valid Query Parameter Set To true';
    responseJSON.id = 'badRequest';

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.message}</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 400, responseXML, 'text/xml');
    }

    const jsonString = JSON.stringify(responseJSON);
    return respond(request, response, 400, jsonString, 'application/json');
  }

  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 200, jsonString, 'application/json');
};

const unauthorized = (request, response, acceptedTypes, params) => {
  const responseJSON = {
    message: 'Request Has A Login Token',
  };

  if (!params.loggedIn || params.loggedIn !== 'yes') {
    responseJSON.message = 'Missing loggedIn Parameter Set To yes';
    responseJSON.id = 'unauthorized';

    if (acceptedTypes[0] === 'text/xml') {
      let responseXML = '<response>';
      responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
      responseXML = `${responseXML} <id>${responseJSON.message}</id>`;
      responseXML = `${responseXML} </response>`;
      return respond(request, response, 401, responseXML, 'text/xml');
    }

    const jsonString = JSON.stringify(responseJSON);
    return respond(request, response, 401, jsonString, 'application/json');
  }

  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 200, jsonString, 'application/json');
};

const forbidden = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Forbidden: You Do Not Have Access',
    id: 'forbidden',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.message}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 403, responseXML, 'text/xml');
  }

  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 403, jsonString, 'application/json');
};

const internal = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'Internal Server Error',
    id: 'InternalServerError',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.message}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 500, responseXML, 'text/xml');
  }

  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 500, jsonString, 'application/json');
};

const notImplemented = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'GET Request Not Implemented For This Page',
    id: 'NotImplemented',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.message}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 501, responseXML, 'text/xml');
  }

  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 501, jsonString, 'application/json');
};

const notFound = (request, response, acceptedTypes) => {
  const responseJSON = {
    message: 'The Page You Were Looking For Was Not Found',
    id: 'NotFound',
  };

  if (acceptedTypes[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>${responseJSON.message}</message>`;
    responseXML = `${responseXML} <id>${responseJSON.message}</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(request, response, 404, responseXML, 'text/xml');
  }

  const jsonString = JSON.stringify(responseJSON);
  return respond(request, response, 404, jsonString, 'application/json');
};

const notFoundMeta = (request, response, acceptedTypes) => {
  if (acceptedTypes[0] === 'text/xml') {
    respondMeta(request, response, 404, 'text/xml');
  }
  respondMeta(request, response, 404, 'application/json');
};

module.exports = {
  success,
  badRequest,
  unauthorized,
  forbidden,
  internal,
  notImplemented,
  notFound,
  notFoundMeta,
};
