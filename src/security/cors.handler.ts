import cors from 'cors';

export const corsHandler = cors({
  origin: 'https://www.ebay-kleinanzeigen.de/*',
  methods: ['GET', 'HEAD', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: [
    'Origin',
    'Content-Type',
    'Accept',
    'Authorization',
    'Access-Control-Allow-Origin',
    'Access-Control-Allow-Methods',
    'Access-Control-Allow-Headers',
    'Allow',
    'Content-Length',
    'Date',
    'Last-Modified',
    'If-Match',
    'If-Not-Match',
    'If-Modified-Since',
  ],
  exposedHeaders: ['Location', 'ETag'],
  maxAge: 86400,
});
