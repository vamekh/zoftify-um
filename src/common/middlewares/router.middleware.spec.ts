import { AccessLogMiddleware } from './access-log-middleware.service';

describe('RouterMiddleware', () => {
  it('should be defined', () => {
    expect(new AccessLogMiddleware()).toBeDefined();
  });
});
