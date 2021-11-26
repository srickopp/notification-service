import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NotificationModule } from './modules/notification/notification.module';
import ormconfig from './ormconfig';
@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), NotificationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
