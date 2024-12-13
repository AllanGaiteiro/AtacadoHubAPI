import { Module } from '@nestjs/common';
import { HealthCheckModule } from './health-check/health-check.module';
import { ConfigService } from '@nestjs/config';
import { appDataSource } from './ormconfig';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(appDataSource.options),
    HealthCheckModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
