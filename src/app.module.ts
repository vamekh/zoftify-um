import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { AuthModule } from './auth/auth.module';
import { DatabaseModule } from './database/database.module';
import { LoggingModule } from './logging/logging.module';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { AccessLogMiddleware } from './common/middlewares/access-log-middleware.service';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    CommonModule,
    AuthModule,
    DatabaseModule,
    LoggingModule,
    UserModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): any {
    consumer.apply(AccessLogMiddleware).forRoutes('*');
  }
}
