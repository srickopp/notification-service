import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity({ name: 'notification_logs' })
export class NotificationLog extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    primary: true,
    type: 'uuid',
    nullable: false,
  })
  transaction_id: string;

  @Column({
    type: 'boolean',
    nullable: false,
  })
  status: boolean;

  @Column({
    length: 255,
    type: 'varchar',
    nullable: false,
  })
  error_message: string;

  @CreateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  created_at: Date;

  @UpdateDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  updated_at: Date;

  @DeleteDateColumn({
    type: 'timestamp with time zone',
    nullable: false,
  })
  deleted_at: Date;

  @ManyToOne(() => Transaction, (trx) => trx.logs)
  @JoinColumn({
    name: 'transaction_id',
  })
  transaction: Transaction;
}
