const respond = (req, res, content, type, statusCode) => {
  res.writeHead(statusCode, { 'Content-Type': type });
  res.write(content);
  res.end();
};
// Success call
const getSuccess = (req, res, type) => {
  const success = {
    message: 'This is a successful response',
  };

  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>This is a successful response</message>`;
    responseXML = `${responseXML} </response>`;

    return respond(req, res, responseXML, 'text/xml', 200);
  }
  const jsonResponse = JSON.stringify(success);
  return respond(req, res, jsonResponse, 'application/json', 200);
};
// Bad Request Call
const getBadRequest = (req, res, type, query) => {
  let badRequest;
  let statusCode;
  if (query.valid) {
    badRequest = {
      message: 'This request has the required parameters.',
    };
    statusCode = 200;
  } else if (!query.valid || query.valid !== 'true') {
    badRequest = {
      message: 'Missing valid query paremter set to true.',
      id: 'badRequest',
    };
    statusCode = 400;
  }
  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    if (query.valid) {
      responseXML = `${responseXML} <message>This request has the required parameters</message>`;
    } else {
      responseXML = `${responseXML} <message>Missing valid query paremter set to true</message>`;
    }
    responseXML = `${responseXML}<id>badRequest</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(req, res, responseXML, 'text/xml', statusCode);
  }

  const jsonResponse = JSON.stringify(badRequest);

  return respond(req, res, jsonResponse, 'application/json', statusCode);
};
// Unauthorized Call
const getUnauthorized = (req, res, type, query) => {
  let unauthorzed;
  let statusCode;
  if (query.loggedIn === 'yes') {
    unauthorzed = {
      message: 'You have successfully viewed the content.',
    };
    statusCode = 200;
  } else if (!query.loggedIn || query.loggedIn !== 'yes') {
    unauthorzed = {
      message: 'Missing loggedIn query parameter set to yes.',
      id: 'unauthorized',
    };
    statusCode = 401;
  }
  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    if (query.loggedIn === 'yes') {
      responseXML = `${responseXML} <message>You have successfully viewed the content.</message>`;
    } else {
      responseXML = `${responseXML} <message>Missing loggedIn query parameter set to yes.</message>`;
    }
    responseXML = `${responseXML}<id>unauthorized</id>`;
    responseXML = `${responseXML} </response>`;
    return respond(req, res, responseXML, 'text/xml', statusCode);
  }
  const jsonResponse = JSON.stringify(unauthorzed);

  return respond(req, res, jsonResponse, 'application/json', statusCode);
};
// Forbidden call
const getForbidden = (req, res, type) => {
  const forbidden = {
    message: 'You do not have access to this content.',
    id: 'forbidden',
  };
  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>You do not have access to this content.</message>`;
    responseXML = `${responseXML} <id>forbidden</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(req, res, responseXML, 'text/xml', 403);
  }
  const jsonResponse = JSON.stringify(forbidden);

  return respond(req, res, jsonResponse, 'application/json', 403);
};
// Internal Server error call
const getInternal = (req, res, type) => {
  const internal = {
    message: 'Internal Server Error. Something went wrong.',
    id: 'internalError',
  };
  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>Internal Server Error. Something went wrong.</message>`;
    responseXML = `${responseXML} <id>internalError</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(req, res, responseXML, 'text/xml', 500);
  }
  const jsonResponse = JSON.stringify(internal);

  return respond(req, res, jsonResponse, 'application/json', 500);
};
// not implemented call
const getNotImplemented = (req, res, type) => {
  const notImplemented = {
    message: 'A get request for this page has not been implemented yet. Check again later for uploaded content.',
    id: 'notImplemented',
  };
  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>A get request for this page has not been implemented yet. Check again later for uploaded content.</message>`;
    responseXML = `${responseXML} <id>notImplemented</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(req, res, responseXML, 'text/xml', 501);
  }
  const jsonResponse = JSON.stringify(notImplemented);

  return respond(req, res, jsonResponse, 'application/json', 501);
};
// not found call
const getNotFound = (req, res, type) => {
  const notFound = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  if (type[0] === 'text/xml') {
    let responseXML = '<response>';
    responseXML = `${responseXML} <message>The page you are looking for was not found.</message>`;
    responseXML = `${responseXML} <id>notFound</id>`;
    responseXML = `${responseXML} </response>`;

    return respond(req, res, responseXML, 'text/xml', 404);
  }
  const jsonResponse = JSON.stringify(notFound);

  return respond(req, res, jsonResponse, 'application/json', 404);
};
// exports
module.exports = {
  getSuccess,
  getBadRequest,
  getUnauthorized,
  getForbidden,
  getInternal,
  getNotImplemented,
  getNotFound,
};
