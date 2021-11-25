import {
  BaseEntity,
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity({ name: 'merchants' })
export class Merchant extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({
    length: 150,
    type: 'varchar',
    nullable: false,
  })
  name: string;

  @Column({
    length: 255,
    type: 'varchar',
    nullable: false,
  })
  callback_url: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  api_key: string;

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

  @OneToMany(() => Transaction, (trx) => trx.merchant)
  @JoinColumn({
    name: 'id',
  })
  transactions: Transaction[];
}
