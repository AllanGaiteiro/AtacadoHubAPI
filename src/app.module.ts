import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { ConfigService } from '@nestjs/config';
import { appDataSource } from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(appDataSource.options),
    HealthCheckModule,
    UsersModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
