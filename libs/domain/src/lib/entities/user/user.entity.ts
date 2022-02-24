import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  password!: string;

  @Column()
  email!: string;

  // GUEST, USER, ADMIN, SUPER
  @Column({ default: 'GUEST' })
  role!: string;

  @CreateDateColumn({ name: 'created_at', select: false })
  createdAt?: Date;

  @CreateDateColumn({ name: 'updated_at', select: false })
  updatedAt?: Date;

  @Column({ name: 'current_hashed_refresh_token', nullable: true })
  currentHashedRefreshToken?: string;
}
