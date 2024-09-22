import { Injectable, Logger, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AccessLogMiddleware implements NestMiddleware {
  private readonly logger: Logger = new Logger(AccessLogMiddleware.name);

  use(req: Request, res: Response, next: () => void) {
    const startTime = new Date();

    res.on('finish', () => {
      const endTime = new Date();
      const timeTaken = endTime.getTime() - startTime.getTime();

      this.logger.log(
        `${req.method} ${req.originalUrl} took ${timeTaken}ms. [${startTime.toISOString()} - ${endTime.toISOString()}]`,
      );
    });

    next();
  }
}
