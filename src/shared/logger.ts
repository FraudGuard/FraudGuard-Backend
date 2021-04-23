import pino, { Logger, LoggerOptions } from 'pino';

const pinoPrettifyOptions = {
  colorize: true,
  levelFirst: true,
};

export const logger: Logger = pino({
  prettyPrint: {
    colorize: true,
    levelFirst: true,
  },
});

export const loggerProfiles = new Map<string, LoggerOptions>([
  [
    'info',
    {
      prettyPrint: pinoPrettifyOptions,
      level: 'info',
      formatters: {
        level(label) {
          return { level: label };
        },
      },
    },
  ],
  [
    'debug',
    {
      prettyPrint: pinoPrettifyOptions,
      level: 'debug',
      formatters: {
        level(label) {
          return { level: label };
        },
      },
    },
  ],
  [
    'trace',
    {
      prettyPrint: pinoPrettifyOptions,
      level: 'trace',
      formatters: {
        level(label) {
          return { level: label };
        },
      },
    },
  ],
  [
    'test',
    {
      prettyPrint: pinoPrettifyOptions,
      level: 'warn',
      formatters: {
        level(label) {
          return { level: label };
        },
      },
    },
  ],
]);
