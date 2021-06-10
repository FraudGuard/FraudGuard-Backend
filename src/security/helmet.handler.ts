import {
  contentSecurityPolicy,
  frameguard,
  hidePoweredBy,
  hsts,
  noSniff,
  xssFilter,
} from 'helmet';

/**
 * Wird beim Initieren eines express App-Objekts mitgegeben. Setzt für Request Header, welche z. B. Clickjacking, XSS, HSTS verhindern
 */
export const helmetHandlers = [
  contentSecurityPolicy({
    useDefaults: true,
  }),

  xssFilter(),

  frameguard(),

  hsts(),

  noSniff(),

  hidePoweredBy(),
];
