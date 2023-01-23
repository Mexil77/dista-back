import { ArgumentsHost, HttpException } from '@nestjs/common';
import { isArray } from 'lodash';

export const httpResponse = (exception: HttpException, host: ArgumentsHost) => {
  const ctx = host.switchToHttp();
  const res = ctx.getResponse();
  const status = exception.getStatus();
  const message = exception.getResponse() as any;
  let text: {};

  if (message.error) {
    text = isArray(message.error) ? message.error[0] : message.error;
  } else if (message.message === undefined) {
    text = message.error;
  } else text = message.message;

  res.status(status).join({
    error: {
      message: text,
      code: status,
      ...message,
    },
  });
};
