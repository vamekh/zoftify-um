import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  private readonly logger: Logger = new Logger(GlobalExceptionFilter.name);

  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    let status: number;
    let message: any;
    if (exception instanceof HttpException) {
      // Handled exception - it is most likely a user mistake, no need for detailed logging
      this.logger.warn(exception);
      message = this.safeGetErrorMessage(exception.getResponse());
      status = exception.getStatus();
    } else {
      // It's most likely a backend error, so logging full info
      this.logger.error(exception.stack);
      message = 'Internal server error';
      status = HttpStatus.INTERNAL_SERVER_ERROR;
    }
    // Sending standard error
    response.status(status).json({
      message,
      timestamp: Date.now(),
    });
  }

  private safeGetErrorMessage(originalMessage: any): string {
    if (typeof originalMessage === 'string') {
      return originalMessage;
    }
    return (
      originalMessage?.message ||
      originalMessage?.description ||
      'Message not available'
    );
  }
}
