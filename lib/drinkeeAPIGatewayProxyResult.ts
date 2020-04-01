import * as Logger from './logger';
const headers = {
  'Access-Control-Allow-Methods': '*',
  'Access-Control-Allow-Origin': '*',
  'Content-Type': 'application/json',
};

const build = (statusCode: number) => (body: any) => {
  const response = {
    body: body !== undefined ? JSON.stringify(body) : '',
    headers,
    statusCode,
  };

  Logger.info(response);
  return response;
};

const buildError = (statusCode: number) => (msg: string) => {
  const response = {
    body: JSON.stringify({
      msg,
      statusCode,
    }),
    headers,
    statusCode,
  };

  Logger.error(response);
  return response;
};

export const buildResponseError = (error: ResponseError) => {
  let statusCode = error.code ? error.code : 500;
  if (error.name && error.name === 'ItemNotFoundException') {
    statusCode = 404;
  }

  const response = {
    body: JSON.stringify({
      error: error.message,
      errorCode: error.errorCode,
      statusCode,
    }),
    headers,
    statusCode,
  };

  Logger.error(response);
  return response;
};

export class ResponseError extends Error {
  public code: number;
  public errorCode: number | undefined;

  constructor(code: number, message: string, errorCode?: number) {
    super(message);
    this.code = code;
    this.errorCode = errorCode;
    this.message = message;
  }
}

export const created = build(201);
export const success = build(200);
export const noContent = build(204);
export const badRequest = buildError(400);
export const unauthorized = buildError(401);
export const forbidden = buildError(403);
export const notFound = buildError(404);
export const notAcceptable = buildError(406);
export const failure = buildError(500);