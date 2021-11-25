import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Merchant } from './merchant.entity';
import { NotificationLog } from './notification-log.entity';

export enum TransactionStatus {
  SUCCESS = 'SUCCESS', // Status for a success transaction
  FAILED = 'FAILED', // Status if transaction is failed
  PENDING = 'PENDING', // Status if end customer not pay the invoice / partner didn't give any callback info
}

@Entity({ name: 'transactions' })
export class Transaction extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    primary: true,
    type: 'uuid',
    nullable: false,
  })
  merchant_id: string;

  @Column({
    type: 'uuid',
    nullable: false,
  })
  partner_trx_id: string;

  @Column({
    length: 20,
    type: 'varchar',
    nullable: true,
  })
  status: string;

  @Column({
    type: 'float',
    nullable: true,
  })
  amount: number;

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

  @ManyToOne(() => Merchant, (merchant) => merchant.transactions)
  @JoinColumn({
    name: 'merchant_id',
  })
  merchant: Merchant;

  @OneToMany(() => NotificationLog, (log) => log.transaction)
  @JoinColumn({
    name: 'id',
  })
  logs: NotificationLog[];
}
