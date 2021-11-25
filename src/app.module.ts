import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { OrganizationModule } from './modules/organization/organization.module';
import ormconfig from './ormconfig';
@Module({
  imports: [TypeOrmModule.forRoot(ormconfig), OrganizationModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
