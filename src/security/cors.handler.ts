import cors from 'cors';

const whitelist = [
  'https://www.ebay-kleinanzeigen.de/*',
  'https://www.ebay-kleinanzeigen.de',
  'http://localhost:4200',
  'https://awp-label5000.inncoded.com',
];

/**
 * Cross-Origin Resource Sharing ist ein Mechanismus, der Webbrowsern oder auch anderen Webclients Cross-Origin-Requests ermöglicht.
 * Zugriffe dieser Art sind normalerweise durch die Same-Origin-Policy (SOP) untersagt.
 * CORS ist ein Kompromiss zugunsten größerer Flexibilität im Internet unter Berücksichtigung möglichst hoher Sicherheitsmaßnahmen.
 */
const corsHandler = cors({
  origin: function (origin, callback) {
    if (!origin || (origin && whitelist.indexOf(origin) !== -1)) {
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
export { corsHandler };
