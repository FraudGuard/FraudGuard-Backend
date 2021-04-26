import rimraf from 'rimraf';

const noop = (_: Error) => {}; // eslint-disable-line @typescript-eslint/no-unused-vars, no-empty-function

rimraf('dist', noop);
rimraf('server.*', noop);
