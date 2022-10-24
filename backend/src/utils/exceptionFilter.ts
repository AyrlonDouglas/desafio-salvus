import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
} from '@nestjs/common';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  catch(exception: InternalServerErrorException | any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;

    /**
     * @description Exception json response
     * @param type
     * @param errorMessage
     * @param _status
     * @param messages
     */
    const responseMessage = (
      type: string,
      errorMessage: string,
      _status = status,
      messages?: string | string[],
    ) => {
      response.status(_status).json({
        statusCode: _status,
        path: request.url,
        errorType: type,
        errorMessage: errorMessage,
        messages: messages,
      });
    };

    if (status === 503) {
      response.status(status).json(exception.getResponse());
    } else {
      responseMessage(exception.name, exception.message, exception.status);
    }
  }
}
