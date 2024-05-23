import { Entity,
     PrimaryGeneratedColumn, 
     Column,
     CreateDateColumn,
     UpdateDateColumn } from 'typeorm';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id!: string;

    @Column({ unique: true })
    email!: string;
}
