import { TypeOrmModule } from '@nestjs/typeorm';
import { MomentEntity } from './entity/moment.entity';

export const databaseProvider = TypeOrmModule.forRoot({
  type: 'sqlite',
  database: 'db.sqlite',
  entities: [MomentEntity],
  synchronize: true,
});
