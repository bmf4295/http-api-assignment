const http = require('http');
const url = require('url');
const query = require('querystring');
const htmlHandler = require('./htmlResponses');
const otherHandler = require('./otherResponses');

const port = process.env.PORT || process.env.NODE_PORT || 3000;

const urlStruct = {
  '/': htmlHandler.getIndex,
  '/css': htmlHandler.getIndexCSS,
  '/success': otherHandler.getSuccess,
  '/badRequest': otherHandler.getBadRequest,
  '/unauthorized': otherHandler.getUnauthorized,
  '/forbidden': otherHandler.getForbidden,
  '/internal': otherHandler.getInternal,
  '/notImplemented': otherHandler.getNotImplemented,
  notFound: otherHandler.getNotFound,
};

const onRequest = (req, res) => {
  const parsedUrl = url.parse(req.url);
  const acceptedTypes = req.headers.accept.split(',');
  const queryParams = query.parse(parsedUrl.query);
  if (urlStruct[parsedUrl.pathname]) {
    urlStruct[parsedUrl.pathname](req, res, acceptedTypes, queryParams);
  } else {
    urlStruct.notFound(req, res, acceptedTypes);
  }
};
http.createServer(onRequest).listen(port);

console.log(`Listening on localhost:${3000}`);
