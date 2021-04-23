import {
  contentSecurityPolicy,
  frameguard,
  hidePoweredBy,
  hsts,
  noSniff,
  xssFilter,
} from 'helmet';

export const helmetHandlers = [
  contentSecurityPolicy({
    directives: {
      defaultSrc: ["https: 'self'"],
      styleSrc: ["https: 'unsafe-inline'"],
    },
  }),

  xssFilter(),

  frameguard(),

  hsts(),

  noSniff(),

  hidePoweredBy(),
];
