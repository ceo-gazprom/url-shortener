import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'link' })
export class LinkEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    unique: true,
  })
  long: string;

  @Column({
    type: 'varchar',
    unique: true,
  })
  short: string;

  @Column({
    type: 'int',
    default: 0,
  })
  count: number;
}
