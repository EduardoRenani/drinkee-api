import * as Moment from 'moment-timezone';
const UNSPECIFIED_ERROR = 'Please specify an error.';

const timestamp = () =>
  Moment()
    .tz('America/Sao_Paulo')
    .valueOf();

export const error = (err: Error | any = new Error(UNSPECIFIED_ERROR)) => {
  if (err instanceof Error) {
    const { name, message, stack } = err;
    const formatted = JSON.stringify({ timestamp: timestamp(), message, stack: stack ? stack.split('\n') : '' });
    // tslint:disable-next-line: no-console
    console.error(name, formatted);
  }
  // tslint:disable-next-line: no-console
  console.error(err);
};

// tslint:disable-next-line: no-console
export const warn = (content: any) => console.warn('WARN', content);

// tslint:disable-next-line: no-console
export const info = (content: any) => console.info('INFO', content);