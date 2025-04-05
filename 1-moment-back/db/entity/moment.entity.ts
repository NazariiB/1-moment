import { MomentStatus } from 'src/enum/momentStatus';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'moment' })
export class MomentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  name: string;

  @Column({ length: 100 })
  fid: string;

  @Column({ length: 100 })
  status: MomentStatus;

  @Column({ length: 100 })
  momentId: string;
}
