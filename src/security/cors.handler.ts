import cors from 'cors';

const whitelist = [
  'https://www.ebay-kleinanzeigen.de/*',
  'http://localhost:4200',
  'https://awp-label5000.inncoded.com',
];

export const corsHandler = cors({
  origin: function (origin, callback) {
    if (origin && whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
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
